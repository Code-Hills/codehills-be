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
-- Data for Name: BlacklistedTokens; Type: TABLE DATA; Schema: public; Owner: kheven
--

COPY public."BlacklistedTokens" (id, token, "blacklistedAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Notifications; Type: TABLE DATA; Schema: public; Owner: kheven
--

COPY public."Notifications" (id, title, description, url, "userId", read, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Projects; Type: TABLE DATA; Schema: public; Owner: kheven
--

COPY public."Projects" (id, name, description, "projectLeadId", "startDate", "endDate", status, "createdAt", "updatedAt") FROM stdin;
8a2a4287-fd47-45f9-a1a0-42e24aeeeddc	Project 1	This is the first project	\N	2023-03-09 02:00:00+02	2023-03-20 02:00:00+02	pending	2024-08-24 00:04:45.194+02	2024-08-24 00:04:45.194+02
3e3cc1b4-d2e2-4d88-9c9e-aa6704b0e6fa	Project 2	This is the second project	\N	2023-03-09 02:00:00+02	2023-03-20 02:00:00+02	pending	2024-08-24 00:04:45.194+02	2024-08-24 00:04:45.194+02
829e56cc-7533-41f3-aee2-0c78e734e1c6	Project 3	This is the third project	\N	2023-03-09 02:00:00+02	2023-03-20 02:00:00+02	pending	2024-08-24 00:04:45.194+02	2024-08-24 00:04:45.194+02
\.


--
-- Data for Name: Reviewers; Type: TABLE DATA; Schema: public; Owner: kheven
--

COPY public."Reviewers" (id, "developerId", "reviewerId", "reviewCycleId", status, "createdAt", "updatedAt") FROM stdin;
d862ce77-1067-478c-94e3-99e8cb0a855d	d862ce77-1067-478c-94e3-99e8cb0a877d	d862ce77-1067-478c-94e3-99e8cb0a877c	4362a0f3-3efb-43ca-ac52-6460bdfba0d5	approved	2024-08-24 00:04:45.215+02	2024-08-24 00:04:45.216+02
d862ce77-1067-478c-94e3-99e8cb0a888c	d862ce77-1067-478c-94e3-99e8cb0a877c	d862ce77-1067-478c-94e3-99e8cb0a877d	4362a0f3-3efb-43ca-ac52-6460bdfba0d5	pending	2024-08-24 00:04:45.216+02	2024-08-24 00:04:45.216+02
\.


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: kheven
--

COPY public."SequelizeMeta" (name) FROM stdin;
1-user.js
20230307201538-create-project.js
20230307211537-add-association-user-project.js
20230324184534-create-notifications.js
20230415110858-developer-reviewers.js
20230505210817-blacklisted-tokens.js
20230522172108-review-cycle.js
20240501212252-rating-categories.js
20240501213041-RatingField.js
20240503210253-overall-reviews.js
20240503210456-field-reviews.js
\.


--
-- Data for Name: UserProjects; Type: TABLE DATA; Schema: public; Owner: kheven
--

COPY public."UserProjects" (id, "userId", "projectId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: tbl_field_reviews; Type: TABLE DATA; Schema: public; Owner: kheven
--

COPY public.tbl_field_reviews (id, "ratingFieldId", "overallReviewId", ratings, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: tbl_overall_reviews; Type: TABLE DATA; Schema: public; Owner: kheven
--

COPY public.tbl_overall_reviews (id, comment, "reviewerId", "revieweeId", "reviewCycleId", type, "createdAt", "updatedAt") FROM stdin;
7f5bfebf-2681-4802-9fad-49834e6a2468	Great product!	d862ce77-1067-478c-94e3-99e8cb0a877d	d862ce77-1067-478c-94e3-99e8cb0a877c	4362a0f3-3efb-43ca-ac52-6460bdfba0d5	\N	2024-08-24 00:04:45.206+02	2024-08-24 00:04:45.206+02
1cd9e490-a4ae-4c80-8c98-64342725d2bb	Average experience.	d862ce77-1067-478c-94e3-99e8cb0a877c	d862ce77-1067-478c-94e3-99e8cb0a877d	4362a0f3-3efb-43ca-ac52-6460bdfba0d5	\N	2024-08-24 00:04:45.206+02	2024-08-24 00:04:45.206+02
d44a9330-6c5f-4f3b-8921-ab5a929c2523	Great improvement!	d862ce77-1067-478c-94e3-99e8cb0a877c	d862ce77-1067-478c-94e3-99e8cb0a877d	4362a0f3-3efb-43ca-ac52-6460bdfba0d5	\N	2024-08-24 00:04:45.206+02	2024-08-24 00:04:45.206+02
\.


--
-- Data for Name: tbl_rating_categories; Type: TABLE DATA; Schema: public; Owner: kheven
--

COPY public.tbl_rating_categories (id, name, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: tbl_rating_fields; Type: TABLE DATA; Schema: public; Owner: kheven
--

COPY public.tbl_rating_fields (id, name, "categoryId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: tbl_review_cycles; Type: TABLE DATA; Schema: public; Owner: kheven
--

COPY public.tbl_review_cycles (id, "startDate", "endDate", active, "createdAt", "updatedAt") FROM stdin;
c1c656af-f5c2-40d6-bb4c-0bc12d79b1be	2023-08-01 02:00:00+02	2023-10-31 02:00:00+02	f	2024-08-24 00:04:45.202+02	2024-08-24 00:04:45.202+02
4362a0f3-3efb-43ca-ac52-6460bdfba0d5	2023-05-01 02:00:00+02	2023-08-28 02:00:00+02	t	2024-08-24 00:04:45.202+02	2024-08-24 00:04:45.202+02
\.


--
-- Data for Name: tbl_users; Type: TABLE DATA; Schema: public; Owner: kheven
--

COPY public.tbl_users (id, "microsoftId", "firstName", "lastName", email, "displayName", telephone, avatar, role, "isActivated", address, bank, gender, "createdAt", "updatedAt") FROM stdin;
d862ce77-1067-478c-94e3-99e8cb0a877e	410377e1-8bdd-41fa-b5c6-286cf1ae1ed3	Emmanuel	NKUBITO	codehill@admin.com	Emmanuel NKUBITO	+250788888888	https://www.images.com/avatar-12ddee-213-csd	admin	t	\N	\N	\N	2024-08-24 00:04:45.174+02	2024-08-24 00:04:45.174+02
d862ce77-1067-478c-94e3-99e8cb0a877d	410377e1-8bdd-41fa-b5c6-286cf1ae1ed3	John	Doe	jdoe@example.com	Doe	+250788884444	https://www.images.com/avatar-12ddee-213-csd	developer	t	\N	\N	\N	2024-08-24 00:04:45.174+02	2024-08-24 00:04:45.174+02
d862ce77-1067-478c-94e3-99e8cb0a877c	410377e1-8bdd-41fa-b5c6-286cf1ae1ed3	Jane	Doe	janedoe@example.com	Jane Doe	+250788884444	https://www.images.com/avatar-12ddee-213-csd	developer	t	\N	\N	\N	2024-08-24 00:04:45.174+02	2024-08-24 00:04:45.174+02
d862ce77-1067-478c-94e3-99e8cb0a877b	410377e1-8bdd-41fa-b5c6-286cf1ae1ed3	Patrick	Nshimiyimana	patrickn@example.com	Doe	+250788884444	https://www.images.com/avatar-12ddee-213-csd	architect	t	\N	\N	\N	2024-08-24 00:04:45.174+02	2024-08-24 00:04:45.174+02
8185f8a6-a476-4e13-a890-b01bb446001a	8c3c798b39e7b3de	Cyusa	Kheven	cyusa.kheven@outlook.com	Cyusa Kheven	\N	\N	developer	t	\N	\N	\N	2024-08-28 19:24:06.631+02	2024-08-28 19:24:06.631+02
\.


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

