import z from "zod"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"
import { randomUUID } from "crypto"

export async function voteOnPoll(app: FastifyInstance) {
  app.post('/polls/:pollId/vote', async (req, res) => {
    const voteOnPoll = z.object({
      pollOptionId: z.string().uuid(),
    })

    const voteOnPollParams = z.object({
      polld: z.string().uuid(),
    })

    const { pollOptionId } = voteOnPoll.parse(req.body)
    const { polld } = voteOnPollParams.parse(req.params)

    let { sessionId } = req.cookies

    if (!sessionId) {
      sessionId = randomUUID()

      res.setCookie('sessionId', sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30, //30 days,
        signed: true,
        httpOnly: true
      })
    }



    return res.status(201).send()
  })
}