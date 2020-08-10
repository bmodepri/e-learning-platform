import { Request, Response } from 'express';

import db from '../database/connection';

export default class ConnectionsController {
    
    async index(request: Request, response: Response) {
        
        const totalConnections = await db('connections').count('* as total');

        const { total } = totalConnections[0];

        return response.json({ total });
    }
    
    async create(request: Request, response: Response) {
        const trx = await db.transaction();
        const { user_id } = request.body;

        await trx('connections').insert({
            user_id
        }).then((result) => {
            trx.commit();
            return response.status(201)
            .json({
                status: 201, 
                message: `Created ${result}`
            })
        })
        .catch(error => {
            trx.rollback();
            response.status(400).json({
                status: 400,
                message: `${error}`
            })
        })

    }
}