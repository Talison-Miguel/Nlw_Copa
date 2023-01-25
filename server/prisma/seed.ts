import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: "Talison",
            email: "talison@gmail.com",
            avatarUrl: 'https://github.com/diego3g.png'
        }
    })

    const poll = await prisma.poll.create({
        data: {
            title: 'exemplo de poll',
            code: 'BOL123',
            ownerId: user.id,

            participant: {
                create: {
                    userId: user.id
                }
            }
        }
    })


    await prisma.game.create({
        data: {
            date: '2022-11-03T12:00:00.201Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-04T12:00:00.201Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses: {
                create: {
                    firstTeamPoint: 2,
                    secondTeamPoints: 1,
                    
                    participant: {
                        connect: {
                            userId_pollId: {
                                userId: user.id,
                                pollId: poll.id,
                            }
                        }
                    }
                }
            }
        }
    })
}

main()