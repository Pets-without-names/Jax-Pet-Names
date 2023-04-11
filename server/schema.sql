--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: pet_names; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pet_names (
    id integer NOT NULL,
    name character varying(30),
    used boolean DEFAULT false
);


ALTER TABLE public.pet_names OWNER TO postgres;

--
-- Name: pet_names_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pet_names_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pet_names_id_seq OWNER TO postgres;

--
-- Name: pet_names_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pet_names_id_seq OWNED BY public.pet_names.id;


--
-- Name: pet_names id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_names ALTER COLUMN id SET DEFAULT nextval('public.pet_names_id_seq'::regclass);


--
-- Name: pet_names pet_names_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_names
    ADD CONSTRAINT pet_names_pkey PRIMARY KEY (id);

--
-- PostgreSQL database dump complete
--
