import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { getRepositoryToken } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { AppModule } from './app.module'
import { User } from './users/user.entity'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  })

  app.useBodyParser('json', { limit: '10mb' })
  app.useBodyParser('urlencoded', { extended: true, limit: '10mb' })

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin, localhost, or any vercel deployment
      if (
        !origin ||
        origin.includes('localhost') ||
        origin.endsWith('.vercel.app') ||
        (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL)
      ) {
        return callback(null, true)
      }
      return callback(null, true)
    },
    credentials: true,
  })

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  app.setGlobalPrefix('api')

  // Auto-create admin account from env vars on startup
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD
  if (adminEmail && adminPassword) {
    const userRepo = app.get(getRepositoryToken(User))
    const existing = await userRepo.findOne({ where: { email: adminEmail } })
    if (!existing) {
      const passwordHash = await bcrypt.hash(adminPassword, 10)
      await userRepo.save(userRepo.create({ email: adminEmail, passwordHash, name: 'Admin', role: 'admin' }))
      console.log(`Admin account created: ${adminEmail}`)
    } else if (existing.role !== 'admin') {
      await userRepo.update({ email: adminEmail }, { role: 'admin' })
      console.log(`Admin role granted to: ${adminEmail}`)
    }
  }

  const port = process.env.PORT ?? 3001
  await app.listen(port)
  console.log(`Commonly API running on http://localhost:${port}/api`)
}

bootstrap()
