const { pgTable,serial, text, varchar  } = require("drizzle-orm/pg-core");

// Description: This file contains the schema for the MockInterview table.
export const MockInterview  = pgTable('MockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResponse:text('jsonMockResponse').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt').notNull(),
    mockId:varchar('mockId').notNull(),
}
)