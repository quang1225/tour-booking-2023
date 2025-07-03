import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServer } from '@apollo/server'
import { NextRequest } from 'next/server'
import 'reflect-metadata'
import {
  resolvers,
  ResolversEnhanceMap,
  ModelsEnhanceMap,
  applyResolversEnhanceMap,
  applyModelsEnhanceMap,
} from '@generated/type-graphql'
import { AuthChecker, buildSchema, Authorized } from 'type-graphql'
import prisma from '@/app/admin/(utils)/prisma'
import { JwtUserData, decodeJWT, getTokenFromReq } from '@/app/admin/(utils)'

interface UserContext extends JwtUserData {
  token: string
  email: string
  roles: string[]
}

interface ContextType {
  user: UserContext
  req: NextRequest
  prisma: typeof prisma
}

const customAuthChecker: AuthChecker<ContextType> = (
  { root, args, context, info },
  roles
) => {
  const { user } = context
  const { role } = user
  return roles.includes(role)
}

const resolversEnhanceMap: ResolversEnhanceMap = {
  User: {
    _all: [Authorized('ADMIN')],
  },
  Category: {
    _query: [],
    _mutation: [Authorized('ADMIN')],
  },
  Tour: {
    _query: [],
    _mutation: [Authorized('ADMIN')],
  },
  Order: {
    _all: [Authorized('ADMIN')],
  },
}

const modelsEnhanceMap: ModelsEnhanceMap = {
  User: {
    fields: {
      password: [Authorized('ADMIN')],
    },
  },
}

applyResolversEnhanceMap(resolversEnhanceMap)
applyModelsEnhanceMap(modelsEnhanceMap)

const schema = await buildSchema({
  resolvers,
  validate: false,
  authChecker: customAuthChecker,
})

const server = new ApolloServer({
  schema,
})

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
    const token = getTokenFromReq(req)
    const userData = await decodeJWT(token)

    const user = {
      token,
      ...userData,
    } as UserContext

    return { req, prisma, user }
  },
})

export async function GET(request: any) {
  return handler(request)
}

export async function POST(request: any) {
  return handler(request)
}
