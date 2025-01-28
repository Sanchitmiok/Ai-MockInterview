const { pgTable, serial, text, varchar } = require("drizzle-orm/pg-core");

// Description: This file contains the schema for the MockInterview table.
export const MockInterview = pgTable("MockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResponse: text("jsonMockResponse").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDesc: varchar("jobDesc").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
  mockId: varchar("mockId").notNull(),
});

export const UserAnswer = pgTable("UserAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId").notNull(),
  question: varchar("question").notNull(),
  correctAns:varchar('correctAns'),
  userAns: text("userAns").notNull(),
  feedback: text("feedback").notNull(),
  rating: varchar("rating").notNull(),
  userEmail: varchar("userEmail").notNull(),
  createdAt: varchar("createdAt").notNull(),
});
