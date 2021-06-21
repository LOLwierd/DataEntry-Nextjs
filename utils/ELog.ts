import { APIFunction } from '../types'
import { logger } from '../lib/logger'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function ELog(func: APIFunction, req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        await func(req, res)
    } catch (e) {
        logger.error(`Error in ${req.url}: ${e}`)
        res.status(500).end()
    }
}
