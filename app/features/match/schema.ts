import {
  pgTable,
  bigint,
  uuid,
  varchar,
  integer,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { eq, sql, desc } from "drizzle-orm";
import db from "~/db";

// 매치 상태 타입 정의
export const MATCH_STATUS = {
  OPEN: "OPEN", // 모집 중
  CLOSED: "CLOSED", // 모집 완료
  CANCELED: "CANCELED", // 취소됨
  COMPLETED: "COMPLETED", // 경기 완료
} as const;

export type MatchStatus = (typeof MATCH_STATUS)[keyof typeof MATCH_STATUS];

// 매치 테이블 스키마 정의
export const bkPrMatch = pgTable("bk_pr_match", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  bk_pr_match_uuid: uuid("bk_pr_match_uuid").notNull(),
  sports_type: text("sports_type").notNull(),
  min_participants: integer("min_participants").notNull(),
  max_participants: integer("max_participants").notNull(),
  match_status: text("match_status").notNull(),
  bk_gym_id: bigint("bk_gym_id", { mode: "number" }).notNull(),
  bk_match_rules_id: bigint("bk_match_rules_id", { mode: "number" }).notNull(),
  bk_refund_policy_id: bigint("bk_refund_policy_id", {
    mode: "number",
  }).notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: false }).defaultNow(),
  bk_pr_match_date: timestamp("bk_pr_match_date").notNull(),
  start_time: timestamp("start_time").notNull(),
  end_time: timestamp("end_time").notNull(),
});
