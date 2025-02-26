CREATE TABLE "bk_pr_match" (
	"id" bigint PRIMARY KEY NOT NULL,
	"bk_pr_match_uuid" uuid NOT NULL,
	"sports_type" text NOT NULL,
	"min_participants" integer NOT NULL,
	"max_participants" integer NOT NULL,
	"match_status" text NOT NULL,
	"bk_gym_id" bigint NOT NULL,
	"bk_match_rules_id" bigint NOT NULL,
	"bk_refund_policy_id" bigint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"bk_pr_match_date" timestamp NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL
);
