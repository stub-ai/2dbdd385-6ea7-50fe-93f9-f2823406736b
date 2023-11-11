import type { NextApiRequest, NextApiResponse } from 'next'

type Application = {
  id: string
  name: string
}

let applications: Application[] = []

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Application[] | Application>
) {
  switch (req.method) {
    case 'GET':
      res.status(200).json(applications)
      break
    case 'POST':
      const newApplication: Application = {
        id: new Date().toISOString(),
        name: req.body.name,
      }
      applications.push(newApplication)
      res.status(201).json(newApplication)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}