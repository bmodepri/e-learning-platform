import { Request, Response } from 'express';

import db from '../database/connection';
import convertHoursToMinutes from '../utils/convertHorsToMinutes';

interface ScheduleItem {
    class_id: number,
    week_day: number,
    from: string,
    to: string
}

export default class ClassesController {

    async index(request: Request, response: Response) {

        const filters = request.query;
        const week_day = filters.week_day as string;
        const time = filters.time as string;
        const subject = filters.subject as string;

        if(!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: 'Missing required filters to search classes'
            });
        }

        const timeInMinutes = convertHoursToMinutes(time);

        await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('class_schedule.class_id = classes.id')
                .whereRaw('class_schedule.week_day = ?', [Number(week_day)])
                .whereRaw('class_schedule.from <= ?', [timeInMinutes] )
                .whereRaw('class_schedule.to > ?', [timeInMinutes] )
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*'])
            .then(function (classes){              
                return response.json(classes);
            }).catch(error => {
                response.status(400).json({
                    error: 'Bad request',
                    message: `${error}`
                })
            });
    }
  
    async create(request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
        
        await db('users').insert({
            name,
            avatar,
            whatsapp,
            bio
        }).returning('id')
        .then(function (id) {
              
            db('classes').insert({
                subject,
                cost,
                user_id: id[0]
            }).returning('id')
            .then(function(id) {   
                
                db.batchInsert('class_schedule', 
                    schedule.map((scheduleItem: ScheduleItem) => {
                        return {
                            week_day: Number(scheduleItem.week_day),
                            from: convertHoursToMinutes(scheduleItem.from),
                            to: convertHoursToMinutes(scheduleItem.to),
                            class_id: id[0]
                        };
                    })
                );
            })
            .catch(error => {
               response.status(400).json({
                    error: 'Unexpected error while creating new class',
                    message: `${error}`
                })
            });
        });

        return response.status(201).json({
            status: 201,
            message: `Class created successfully`
        });
    ;}

};