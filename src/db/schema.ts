import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  points: integer('points').notNull().default(0),
  createdAt: text('created_at').notNull(),
});

export const trips = sqliteTable('trips', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  destination: text('destination').notNull(),
  budget: integer('budget').notNull(),
  days: integer('days').notNull(),
  routeType: text('route_type').notNull(),
  difficulty: text('difficulty').notNull(),
  transport: text('transport').notNull(),
  distance: text('distance').notNull(),
  co2: text('co2').notNull(),
  pointsEarned: integer('points_earned').notNull(),
  createdAt: text('created_at').notNull(),
});

export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  tripId: integer('trip_id').notNull().references(() => trips.id),
  username: text('username').notNull(),
  comment: text('comment').notNull(),
  rating: integer('rating').notNull(),
  createdAt: text('created_at').notNull(),
});