--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Ubuntu 14.13-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.13 (Ubuntu 14.13-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: enum_Projects_status; Type: TYPE; Schema: public; Owner: kheven
--

CREATE TYPE public."enum_Projects_status" AS ENUM (
    'pending',
    'in-progress',
    'completed'
);


ALTER TYPE public."enum_Projects_status" OWNER TO kheven;

--
-- Name: enum_Reviewers_status; Type: TYPE; Schema: public; Owner: kheven
--

CREATE TYPE public."enum_Reviewers_status" AS ENUM (
    'pending',
    'approved',
    'rejected'
);


ALTER TYPE public."enum_Reviewers_status" OWNER TO kheven;

--
-- Name: enum_tbl_users_role; Type: TYPE; Schema: public; Owner: kheven
--

CREATE TYPE public.enum_tbl_users_role AS ENUM (
    'developer',
    'manager',
    'architect',
    'admin'
);


ALTER TYPE public.enum_tbl_users_role OWNER TO kheven;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: BlacklistedTokens; Type: TABLE; Schema: public; Owner: kheven
--

CREATE TABLE public."BlacklistedTokens" (
    id uuid NOT NULL,
    token text NOT NULL,
    "blacklistedAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."BlacklistedTokens" OWNER TO kheven;

--
-- Name: Notifications; Type: TABLE; Schema: public; Owner: kheven
--

CREATE TABLE public."Notifications" (
    id uuid NOT NULL,
    title character varying(255),
    description text,
    url character varying(255),
    "userId" uuid NOT NULL,
    read boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Notifications" OWNER TO kheven;

--
-- Name: Projects; Type: TABLE; Schema: public; Owner: kheven
--

CREATE TABLE public."Projects" (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL,
    "projectLeadId" uuid,
    "startDate" timestamp with time zone,
    "endDate" timestamp with time zone,
    status public."enum_Projects_status" DEFAULT 'pending'::public."enum_Projects_status",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Projects" OWNER TO kheven;

--
-- Name: Reviewers; Type: TABLE; Schema: public; Owner: kheven
--

CREATE TABLE public."Reviewers" (
    id uuid NOT NULL,
    "developerId" uuid NOT NULL,
    "reviewerId" uuid NOT NULL,
    "reviewCycleId" uuid NOT NULL,
    status public."enum_Reviewers_status" DEFAULT 'pending'::public."enum_Reviewers_status",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Reviewers" OWNER TO kheven;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: kheven
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO kheven;

--
-- Name: UserProjects; Type: TABLE; Schema: public; Owner: kheven
--

CREATE TABLE public."UserProjects" (
    id uuid NOT NULL,
    "userId" uuid NOT NULL,
    "projectId" uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."UserProjects" OWNER TO kheven;

--
-- Name: tbl_field_reviews; Type: TABLE; Schema: public; Owner: kheven
--

CREATE TABLE public.tbl_field_reviews (
    id uuid NOT NULL,
    "ratingFieldId" uuid,
    "overallReviewId" uuid,
    ratings integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.tbl_field_reviews OWNER TO kheven;

--
-- Name: tbl_overall_reviews; Type: TABLE; Schema: public; Owner: kheven
--

CREATE TABLE public.tbl_overall_reviews (
    id uuid NOT NULL,
    comment text,
    "reviewerId" uuid,
    "revieweeId" uuid,
    "reviewCycleId" uuid,
    type character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.tbl_overall_reviews OWNER TO kheven;

--
-- Name: tbl_rating_categories; Type: TABLE; Schema: public; Owner: kheven
--

CREATE TABLE public.tbl_rating_categories (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.tbl_rating_categories OWNER TO kheven;

--
-- Name: tbl_rating_fields; Type: TABLE; Schema: public; Owner: kheven
--

CREATE TABLE public.tbl_rating_fields (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    "categoryId" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.tbl_rating_fields OWNER TO kheven;

--
-- Name: tbl_review_cycles; Type: TABLE; Schema: public; Owner: kheven
--

CREATE TABLE public.tbl_review_cycles (
    id uuid NOT NULL,
    "startDate" timestamp with time zone NOT NULL,
    "endDate" timestamp with time zone NOT NULL,
    active boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.tbl_review_cycles OWNER TO kheven;

--
-- Name: tbl_users; Type: TABLE; Schema: public; Owner: kheven
--

CREATE TABLE public.tbl_users (
    id uuid NOT NULL,
    "microsoftId" character varying(255),
    "firstName" character varying(255),
    "lastName" character varying(255),
    email character varying(255),
    "displayName" character varying(255),
    telephone character varying(255),
    avatar character varying(255),
    role public.enum_tbl_users_role DEFAULT 'developer'::public.enum_tbl_users_role,
    "isActivated" boolean,
    address jsonb,
    bank jsonb,
    gender character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.tbl_users OWNER TO kheven;

--
-- Name: BlacklistedTokens BlacklistedTokens_pkey; Type: CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public."BlacklistedTokens"
    ADD CONSTRAINT "BlacklistedTokens_pkey" PRIMARY KEY (id);


--
-- Name: BlacklistedTokens BlacklistedTokens_token_key; Type: CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public."BlacklistedTokens"
    ADD CONSTRAINT "BlacklistedTokens_token_key" UNIQUE (token);


--
-- Name: Notifications Notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "Notifications_pkey" PRIMARY KEY (id);


--
-- Name: Projects Projects_pkey; Type: CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public."Projects"
    ADD CONSTRAINT "Projects_pkey" PRIMARY KEY (id);


--
-- Name: Reviewers Reviewers_pkey; Type: CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public."Reviewers"
    ADD CONSTRAINT "Reviewers_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: UserProjects UserProjects_pkey; Type: CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public."UserProjects"
    ADD CONSTRAINT "UserProjects_pkey" PRIMARY KEY (id);


--
-- Name: tbl_field_reviews tbl_field_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public.tbl_field_reviews
    ADD CONSTRAINT tbl_field_reviews_pkey PRIMARY KEY (id);


--
-- Name: tbl_overall_reviews tbl_overall_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public.tbl_overall_reviews
    ADD CONSTRAINT tbl_overall_reviews_pkey PRIMARY KEY (id);


--
-- Name: tbl_rating_categories tbl_rating_categories_name_key; Type: CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public.tbl_rating_categories
    ADD CONSTRAINT tbl_rating_categories_name_key UNIQUE (name);


--
-- Name: tbl_rating_categories tbl_rating_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public.tbl_rating_categories
    ADD CONSTRAINT tbl_rating_categories_pkey PRIMARY KEY (id);


--
-- Name: tbl_rating_fields tbl_rating_fields_name_key; Type: CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public.tbl_rating_fields
    ADD CONSTRAINT tbl_rating_fields_name_key UNIQUE (name);


--
-- Name: tbl_rating_fields tbl_rating_fields_pkey; Type: CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public.tbl_rating_fields
    ADD CONSTRAINT tbl_rating_fields_pkey PRIMARY KEY (id);


--
-- Name: tbl_review_cycles tbl_review_cycles_pkey; Type: CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public.tbl_review_cycles
    ADD CONSTRAINT tbl_review_cycles_pkey PRIMARY KEY (id);


--
-- Name: tbl_users tbl_users_pkey; Type: CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public.tbl_users
    ADD CONSTRAINT tbl_users_pkey PRIMARY KEY (id);


--
-- Name: UserProject_unique_constraint; Type: INDEX; Schema: public; Owner: kheven
--

CREATE UNIQUE INDEX "UserProject_unique_constraint" ON public."UserProjects" USING btree ("userId", "projectId");


--
-- Name: Notifications Notifications_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "Notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.tbl_users(id);


--
-- Name: Projects Projects_projectLeadId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public."Projects"
    ADD CONSTRAINT "Projects_projectLeadId_fkey" FOREIGN KEY ("projectLeadId") REFERENCES public.tbl_users(id);


--
-- Name: Reviewers Reviewers_developerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public."Reviewers"
    ADD CONSTRAINT "Reviewers_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES public.tbl_users(id);


--
-- Name: Reviewers Reviewers_reviewerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public."Reviewers"
    ADD CONSTRAINT "Reviewers_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES public.tbl_users(id);


--
-- Name: UserProjects UserProjects_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public."UserProjects"
    ADD CONSTRAINT "UserProjects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Projects"(id);


--
-- Name: UserProjects UserProjects_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public."UserProjects"
    ADD CONSTRAINT "UserProjects_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.tbl_users(id);


--
-- Name: tbl_field_reviews tbl_field_reviews_overallReviewId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public.tbl_field_reviews
    ADD CONSTRAINT "tbl_field_reviews_overallReviewId_fkey" FOREIGN KEY ("overallReviewId") REFERENCES public.tbl_overall_reviews(id);


--
-- Name: tbl_field_reviews tbl_field_reviews_ratingFieldId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public.tbl_field_reviews
    ADD CONSTRAINT "tbl_field_reviews_ratingFieldId_fkey" FOREIGN KEY ("ratingFieldId") REFERENCES public.tbl_rating_fields(id);


--
-- Name: tbl_overall_reviews tbl_overall_reviews_reviewCycleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public.tbl_overall_reviews
    ADD CONSTRAINT "tbl_overall_reviews_reviewCycleId_fkey" FOREIGN KEY ("reviewCycleId") REFERENCES public.tbl_review_cycles(id);


--
-- Name: tbl_overall_reviews tbl_overall_reviews_revieweeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public.tbl_overall_reviews
    ADD CONSTRAINT "tbl_overall_reviews_revieweeId_fkey" FOREIGN KEY ("revieweeId") REFERENCES public.tbl_users(id);


--
-- Name: tbl_overall_reviews tbl_overall_reviews_reviewerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public.tbl_overall_reviews
    ADD CONSTRAINT "tbl_overall_reviews_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES public.tbl_users(id);


--
-- Name: tbl_rating_fields tbl_rating_fields_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kheven
--

ALTER TABLE ONLY public.tbl_rating_fields
    ADD CONSTRAINT "tbl_rating_fields_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.tbl_rating_categories(id);


--
-- PostgreSQL database dump complete
--

