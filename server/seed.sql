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
-- Data for Name: pet_names; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pet_names (id, name, used) FROM stdin;
2	Spot	f
3	Stella	f
4	Nala	f
6	Luna	f
7	Max	f
8	Charlie	f
9	Rocky	f
10	Buddy	f
11	Cooper	f
12	Duke	f
13	Bear	f
14	Milo	f
15	Zeus	f
16	Oscar	f
17	Bentley	f
18	Toby	f
19	Riley	f
20	Hank	f
21	Thor	f
22	Ace	f
23	Jasper	f
24	Gizmo	f
25	Bruno	f
26	Cody	f
27	Harley	f
28	Boomer	f
29	Tyson	f
30	Simba	f
31	Ziggy	f
32	Hunter	f
33	Rusty	f
34	Murphy	f
35	Bailey	f
36	Chester	f
37	Jax	f
38	Leo	f
39	Dexter	f
40	Baxter	f
41	Winston	f
42	Hercules	f
43	Gus	f
44	Romeo	f
45	Diesel	f
46	Champ	f
47	Franklin	f
48	Arlo	f
49	Ruger	f
50	Brody	f
51	Zeke	f
52	Coby	f
53	Theo	f
54	Rocky	f
55	Rocco	f
56	Ace	f
57	Bella	f
58	Luna	f
59	Daisy	f
60	Lucy	f
61	Coco	f
62	Lola	f
63	Zoey	f
64	Bailey	f
65	Sadie	f
66	Molly	f
67	Ruby	f
68	Rosie	f
69	Chloe	f
70	Princess	f
71	Lily	f
72	Abby	f
73	Ellie	f
74	Gracie	f
75	Stella	f
76	Penny	f
77	Mia	f
78	Harper	f
79	Willow	f
80	Roxy	f
81	Olive	f
82	Hazel	f
83	Gigi	f
84	Ivy	f
85	Athena	f
86	Maddie	f
87	Callie	f
88	Poppy	f
89	Ruby	f
90	Izzy	f
91	Dolly	f
92	Dixie	f
93	Pearl	f
94	Wren	f
95	Pepper	f
96	Honey	f
97	Nala	f
98	Lulu	f
99	Delilah	f
100	Lady	f
101	Winnie	f
102	Sasha	f
103	Riley	f
104	Fiona	f
105	Penny	f
106	Bella	f
\.


--
-- Name: pet_names_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pet_names_id_seq', 106, true);


--
-- Name: pet_names pet_names_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_names
    ADD CONSTRAINT pet_names_pkey PRIMARY KEY (id);

--
-- PostgreSQL database dump complete
--

