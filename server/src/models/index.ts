import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";
import { UserFactory } from "./user.js";
import { TicketFactory } from "./ticket.js";

// Use DATABASE_URL for Render deployment
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Required for Render’s SSL handling
        },
      },
    })
  : new Sequelize(
      process.env.DB_NAME || "your_db_name",
      process.env.DB_USER || "your_db_user",
      process.env.DB_PASSWORD || "your_db_password",
      {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );

// Initialize models
const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);

// Define relationships
User.hasMany(Ticket, { foreignKey: "assignedUserId" });
Ticket.belongsTo(User, { foreignKey: "assignedUserId", as: "assignedUser" });

export { sequelize, User, Ticket };
