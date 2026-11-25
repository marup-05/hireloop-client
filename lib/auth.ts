
import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { admin } from "better-auth/plugins"

const client = new MongoClient(process.env.BETTER_AUTH_DB_URI as string)
const db = client.db("hireloopdb")

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      accountType: {
        type: "string",
        required: false,
        defaultValue: "seeker",
        input: true,
      },
    },
  },

  plugins: [admin()],

  database: mongodbAdapter(db, {
    client,
  }),
})
