--
-- PostgreSQL database dump
--

-- Dumped from database version 10.13
-- Dumped by pg_dump version 12.3

-- Started on 2020-06-21 10:14:09 +07

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

--
-- TOC entry 196 (class 1259 OID 16384)
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    id bigint NOT NULL,
    created_at bigint NOT NULL,
    updated_at bigint,
    first_name character varying(255),
    middle_name character varying(255),
    last_name character varying(255),
    id_number character varying(64),
    id_created bigint,
    id_location text,
    address text,
    position_id integer,
    bank_number character varying(255),
    bank_name character varying(255),
    bank_branch character varying(255),
    birthday bigint,
    start_time bigint
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 16390)
-- Name: genuid; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genuid (
    id integer NOT NULL,
    index integer,
    count bigint
);


ALTER TABLE public.genuid OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 16393)
-- Name: notify; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notify (
    id bigint NOT NULL,
    create_id bigint,
    create_name character varying(255),
    create_time bigint,
    content character varying(255),
    receive_id bigint,
    view boolean
);


ALTER TABLE public.notify OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 16399)
-- Name: perofproject; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.perofproject (
    pro_id bigint NOT NULL,
    employee_id bigint NOT NULL,
    role integer
);


ALTER TABLE public.perofproject OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16402)
-- Name: positions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.positions (
    id integer NOT NULL,
    name character varying(255),
    created_at bigint,
    updated_at bigint
);


ALTER TABLE public.positions OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16405)
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id bigint NOT NULL,
    title character varying(255),
    description text,
    state integer,
    created_at bigint,
    updated_at bigint
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16411)
-- Name: requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.requests (
    id bigint NOT NULL,
    employeeid bigint,
    name character varying(255),
    "position" character varying(255),
    timestart bigint,
    timeend bigint,
    reason character varying(255),
    confirm boolean
);


ALTER TABLE public.requests OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16417)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying NOT NULL,
    created_at bigint,
    updated_at bigint
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16423)
-- Name: taskcomments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.taskcomments (
    id bigint NOT NULL,
    task_id bigint,
    employee_id bigint,
    comment text,
    created_at bigint,
    updated_at bigint
);


ALTER TABLE public.taskcomments OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16429)
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id bigint NOT NULL,
    project_id bigint,
    title character varying(255),
    started_at bigint,
    duration integer,
    state integer,
    point integer,
    employee_creator bigint,
    description text,
    created_at bigint,
    updated_at bigint,
    employee_assignee bigint,
    pre_task_id character varying(255)
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16435)
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    user_id bigint NOT NULL,
    role_id integer NOT NULL,
    created_at bigint NOT NULL,
    updated_at bigint
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 16438)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(10) NOT NULL,
    password character varying(255) NOT NULL,
    provider character varying(255),
    provider_id character varying(255),
    oauth2_name character varying(255),
    image_url character varying(255),
    email_verified boolean,
    created_at bigint,
    updated_at bigint,
    status integer NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16444)
-- Name: webhook; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.webhook (
    id_webhook bigint NOT NULL,
    id_project bigint NOT NULL,
    bot_token character varying(255) NOT NULL,
    chat_id character varying(355) NOT NULL,
    create_task boolean,
    update_task boolean,
    update_state boolean,
    name_webhook character varying(255)
);


ALTER TABLE public.webhook OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16450)
-- Name: webhook_id_webhook_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.webhook_id_webhook_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.webhook_id_webhook_seq OWNER TO postgres;

--
-- TOC entry 3017 (class 0 OID 0)
-- Dependencies: 209
-- Name: webhook_id_webhook_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.webhook_id_webhook_seq OWNED BY public.webhook.id_webhook;


--
-- TOC entry 210 (class 1259 OID 16545)
-- Name: wiki; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.wiki (
    wiki_id bigint NOT NULL,
    wiki_title character varying(255),
    project_id bigint,
    created_by bigint NOT NULL,
    path character varying(500),
    content text,
    state integer,
    created_at bigint,
    updated_at bigint
);


ALTER TABLE public.wiki OWNER TO postgres;

--
-- TOC entry 2837 (class 2604 OID 16452)
-- Name: webhook id_webhook; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.webhook ALTER COLUMN id_webhook SET DEFAULT nextval('public.webhook_id_webhook_seq'::regclass);


--
-- TOC entry 2997 (class 0 OID 16384)
-- Dependencies: 196
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees (id, created_at, updated_at, first_name, middle_name, last_name, id_number, id_created, id_location, address, position_id, bank_number, bank_name, bank_branch, birthday, start_time) FROM stdin;
15714589149401	1571458915080	\N	Huỳnh	Lê Hữu	Hưng	025699321	1354406400000	CA Hồ Chí Minh	Số 05 đường 3643A Phạm Thế Hiển, P7, Q8, Tp HCM	1	1234 5678 91011	BIDV	CN Quận 8	888105600000	1561939200000
15746071512232	1574607151401	1574607151401	Nguyễn	Văn	Nhân Viên	090912345678	1574607032670	CA Tp Hồ Chí Minh	So 234 Nguyen Huu Tien	4	0909123456789	BIDV	CN Đông Sài Gòn	1574607032670	1574607032670
15746072843063	1574607284409	1574607284409	Nguyễn	Văn	Trưởng Nhóm	090945612378	1574607174704	CA Tp Hồ Chí Minh	So 234 Nguyen Huu Tien	2	0909456123789	BIDV	CN Đông Sài Gòn	1574607174704	1574607174704
15746074348584	1574607434958	1574607434958	Nguyễn	Thị	Nhân Viên	090965432178	1574607299894	CA Tp Hồ Chí Minh	So 234 Nguyen Huu Tien	4	0909654321789	BIDV	CN Đông Sài Gòn	1574607299894	1574607299894
15751881480165	1575188148423	1575254245212	Thai	Thanh 	Liem	123456789	1575188038182	tphcm quan 6 p13	Quận 6	2	123456789	saccombank	phu lam	1520064780000	1575188038182
15782398324826	1578239832616	1578239832616	Pham	Ngoc	Dieu	098712347564	1453309200000	TP HCM	Quận 3	4	34253426435645	Pham Ngoc Dieu	Phu Lam	1578239749399	1578239749399
15782401353207	1578240135422	1578240135422	Nguyễn 	Thanh 	Tân	234235676786	1451926800000	Ca Mau	100 Võ Văn Ngân Thủ Đức	4	2134567542343	Thanh Tân	Đông Sài Gòn	883674000000	1578239988511
15782405203918	1578240520490	1578240520490	Phan Thị 	Thùy 	Dương	3247456435324	1465059600000	Vũng Tàu	3 Võ Văn Kiêt P5 Q5 Tp HCM	4	3245346345243	Thuy Duong	Bắc Sài Gòn	883933200000	1559667600000
15782407734329	1578240773533	1578240773533	Đặng 	Thị 	Duyên	21321432423	1451926800000	Bình Định	50 Bùi Viện Quận 1 TP HCM	4	12324234123	Dang Thi Duyen	Sai Gon	883933200000	1546966800000
15782708385800	1578270838676	1578270838676	Nguyễn 	Thị 	Phúc	4353634523454	1388941200000	An Giang	853 An Dương Vương P13 Q6 Tp HCM	4	235346453245	Phuc	Bắc Sài Gòn	820861200000	1578270700792
\.


--
-- TOC entry 2998 (class 0 OID 16390)
-- Dependencies: 197
-- Data for Name: genuid; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genuid (id, index, count) FROM stdin;
1	0	10
2	3	213
3	2	32
\.


--
-- TOC entry 2999 (class 0 OID 16393)
-- Dependencies: 198
-- Data for Name: notify; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notify (id, create_id, create_name, create_time, content, receive_id, view) FROM stdin;
15752214635352	15751881480165	Thai Thanh  Liem	1575221463127	dcdcdc	15746071512232	f
15752214635533	15751881480165	Thai Thanh  Liem	1575221463127	dcdcdc	15746072843063	f
15752539228978	15751881480165	Thai Thanh  Liem	1575253921355	Di hoc	15746072843063	f
15752539230199	15751881480165	Thai Thanh  Liem	1575253921355	Di hoc	15746071512232	f
15757295276464	15751881480165	Thai Thanh  Liem	1575729526591	Đi học 	15746071512232	f
15757295276625	15751881480165	Thai Thanh  Liem	1575729526591	Đi học 	15746072843063	f
15757890807551	15751881480165	Thai Thanh  Liem	1575763879972	3h hôm nay cty họp ở lầu 1	15746072843063	f
15757890807380	15751881480165	Thai Thanh  Liem	1575763879972	3h hôm nay cty họp ở lầu 1	15746071512232	f
15757899232024	15751881480165	Thai Thanh  Liem	1575764722595	Thứ 7 team Backend tăng ca nha!!!!!	15746071512232	f
15757899232195	15751881480165	Thai Thanh  Liem	1575764722595	Thứ 7 team Backend tăng ca nha!!!!!	15746072843063	f
15758176560767	15751881480165	Thai Thanh  Liem	1575792455375	Noel mỗi người xuống phòng nhân sự ký tên nhận quà	15746072843063	f
15758176560928	15751881480165	Thai Thanh  Liem	1575792455375	Noel mỗi người xuống phòng nhân sự ký tên nhận quà	15746071512232	f
15758177616882	15751881480165	Thai Thanh  Liem	1575792560770	Ngày 11/12 ,Team IT họp lúc 14h tại phòng họp 1	15746072843063	f
15758177617733	15751881480165	Thai Thanh  Liem	1575792560770	Ngày 11/12 ,Team IT họp lúc 14h tại phòng họp 1	15746071512232	f
15758179372235	15751881480165	Thai Thanh  Liem	1575792736589	Ngày 20/12 , họp team fondend 	15746071512232	f
15758179373566	15751881480165	Thai Thanh  Liem	1575792736589	Ngày 20/12 , họp team fondend 	15746072843063	f
15758181646428	15751881480165	Thai Thanh  Liem	1575792964030	Công ty sẽ tất niên vào ngày 30/12/2019	15746071512232	f
15758181647199	15751881480165	Thai Thanh  Liem	1575792964030	Công ty sẽ tất niên vào ngày 30/12/2019	15746072843063	f
15758183527792	15751881480165	Thai Thanh  Liem	1575793152262	Ngày 15/12 , Team nhân sự tổng kết lương thưởng	15746072843063	f
15758183528125	15751881480165	Thai Thanh  Liem	1575793152262	Ngày 15/12 , Team nhân sự tổng kết lương thưởng	15746071512232	f
15758185237487	15751881480165	Thai Thanh  Liem	1575793323181	Mọi người chú ý , cty sẽ chuyển văn phòng ngày 1/1/2020	15746072843063	f
15758185239569	15751881480165	Thai Thanh  Liem	1575793323181	Mọi người chú ý , cty sẽ chuyển văn phòng ngày 1/1/2020	15746071512232	f
15758190377952	15751881480165	Thai Thanh  Liem	1575793836958	Chiều thứ 6 , mọi người được về sớm 1h nha !!!	15746072843063	f
15758190379533	15751881480165	Thai Thanh  Liem	1575793836958	Chiều thứ 6 , mọi người được về sớm 1h nha !!!	15746071512232	f
15758191223514	15751881480165	Thai Thanh  Liem	1575793921803	Team Backend sẽ họp vào chiều nay nhé !!	15746072843063	f
15758191225347	15751881480165	Thai Thanh  Liem	1575793921803	Team Backend sẽ họp vào chiều nay nhé !!	15746071512232	f
15781562768456	15714589149401	Huỳnh Lê Hữu Hưng	1578156276763	Ngay 10/1/2020 , Mọi người tham dự year party !	15714589149401	t
15781570573305	15714589149401	Huỳnh Lê Hữu Hưng	1578157057256	Ngày 10/1/2020 , Sẽ phát thưởng tết cho nhân viên	15746072843063	f
15781570573466	15714589149401	Huỳnh Lê Hữu Hưng	1578157057256	Ngày 10/1/2020 , Sẽ phát thưởng tết cho nhân viên	15746074348584	f
15758195713268	15751881480165	Thai Thanh  Liem	1575794370818	14h hôm nay mọi người họp gấp nhé !!!	15746072843063	f
15758195714340	15751881480165	Thai Thanh  Liem	1575794370818	14h hôm nay mọi người họp gấp nhé !!!	15746071512232	f
15781565073842	15714589149401	Huỳnh Lê Hữu Hưng	1578156507301	Team backend 3h họp 	15751881480165	t
15781570573547	15714589149401	Huỳnh Lê Hữu Hưng	1578157057256	Ngày 10/1/2020 , Sẽ phát thưởng tết cho nhân viên	15751881480165	t
15781570573124	15714589149401	Huỳnh Lê Hữu Hưng	1578157057256	Ngày 10/1/2020 , Sẽ phát thưởng tết cho nhân viên	15714589149401	t
15781565073560	15714589149401	Huỳnh Lê Hữu Hưng	1578156507301	Team backend 3h họp 	15714589149401	t
15782423044988	15751881480165	Thai Thanh  Liem	1578242298493	Tuần sau , Cty sẽ có một buổi tổng vệ sinh nha các ace	15782407734329	f
15782423051792	15751881480165	Thai Thanh  Liem	1578242298493	Tuần sau , Cty sẽ có một buổi tổng vệ sinh nha các ace	15714589149401	f
15781555385754	15714589149401	Huỳnh Lê Hữu Hưng	1578155537992	Ngay 1/1/2020 , Mọi người được nghỉ nhé!!	15751881480165	f
15781555386675	15714589149401	Huỳnh Lê Hữu Hưng	1578155537992	Ngay 1/1/2020 , Mọi người được nghỉ nhé!!	15746072843063	f
15781555386856	15714589149401	Huỳnh Lê Hữu Hưng	1578155537992	Ngay 1/1/2020 , Mọi người được nghỉ nhé!!	15746074348584	f
15781555967168	15714589149401	Huỳnh Lê Hữu Hưng	1578155596632	Cảm ơn tất cả mọi người đã hoàn thành xuất sắc năm 2020 	15746074348584	f
15781555967410	15714589149401	Huỳnh Lê Hữu Hưng	1578155596632	Cảm ơn tất cả mọi người đã hoàn thành xuất sắc năm 2020 	15751881480165	f
15781555967581	15714589149401	Huỳnh Lê Hữu Hưng	1578155596632	Cảm ơn tất cả mọi người đã hoàn thành xuất sắc năm 2020 	15746072843063	f
15781557293093	15714589149401	Huỳnh Lê Hữu Hưng	1578155729205	Có việc riêng	15746072843063	f
15781557293184	15714589149401	Huỳnh Lê Hữu Hưng	1578155729205	Có việc riêng	15746074348584	f
15781562768547	15714589149401	Huỳnh Lê Hữu Hưng	1578156276763	Ngay 10/1/2020 , Mọi người tham dự year party !	15746074348584	f
15781562768708	15714589149401	Huỳnh Lê Hữu Hưng	1578156276763	Ngay 10/1/2020 , Mọi người tham dự year party !	15746072843063	f
15781562768869	15714589149401	Huỳnh Lê Hữu Hưng	1578156276763	Ngay 10/1/2020 , Mọi người tham dự year party !	15751881480165	f
15781565073641	15714589149401	Huỳnh Lê Hữu Hưng	1578156507301	Team backend 3h họp 	15746072843063	f
15781565073883	15714589149401	Huỳnh Lê Hữu Hưng	1578156507301	Team backend 3h họp 	15746074348584	f
15782423046429	15751881480165	Thai Thanh  Liem	1578242298493	Tuần sau , Cty sẽ có một buổi tổng vệ sinh nha các ace	15782398324826	f
15782423048291	15751881480165	Thai Thanh  Liem	1578242298493	Tuần sau , Cty sẽ có một buổi tổng vệ sinh nha các ace	15746074348584	f
15782423058204	15751881480165	Thai Thanh  Liem	1578242298493	Tuần sau , Cty sẽ có một buổi tổng vệ sinh nha các ace	15782405203918	f
15782423058795	15751881480165	Thai Thanh  Liem	1578242298493	Tuần sau , Cty sẽ có một buổi tổng vệ sinh nha các ace	15782401353207	f
15782423053233	15751881480165	Thai Thanh  Liem	1578242298493	Tuần sau , Cty sẽ có một buổi tổng vệ sinh nha các ace	15746072843063	f
15782424602297	15751881480165	Thai Thanh  Liem	1578242460080	Team nhân sự, chiều nay họp ở phòng 2 nha	15746072843063	f
15782424603299	15751881480165	Thai Thanh  Liem	1578242460080	Team nhân sự, chiều nay họp ở phòng 2 nha	15782401353207	f
15782424603930	15751881480165	Thai Thanh  Liem	1578242460080	Team nhân sự, chiều nay họp ở phòng 2 nha	15782398324826	f
15782424604931	15751881480165	Thai Thanh  Liem	1578242460080	Team nhân sự, chiều nay họp ở phòng 2 nha	15751881480165	f
15782424606022	15751881480165	Thai Thanh  Liem	1578242460080	Team nhân sự, chiều nay họp ở phòng 2 nha	15782407734329	f
15782424606433	15751881480165	Thai Thanh  Liem	1578242460080	Team nhân sự, chiều nay họp ở phòng 2 nha	15782405203918	f
15782424602838	15751881480165	Thai Thanh  Liem	1578242460080	Team nhân sự, chiều nay họp ở phòng 2 nha	15746074348584	f
15782424601966	15751881480165	Thai Thanh  Liem	1578242460080	Team nhân sự, chiều nay họp ở phòng 2 nha	15714589149401	t
\.


--
-- TOC entry 3000 (class 0 OID 16399)
-- Dependencies: 199
-- Data for Name: perofproject; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.perofproject (pro_id, employee_id, role) FROM stdin;
15776774274194	15714589149401	0
15776775042945	15714589149401	0
15776775042945	15751881480165	1
15782413529787	15751881480165	0
15782413529296	15751881480165	0
15782413529787	15782401353207	2
15782413529296	15782405203918	2
15776774274194	15782398324826	2
15776774274194	15782401353207	2
15776774274194	15751881480165	1
15782413529787	15782407734329	2
15921917957796	15714589149401	0
15921917957796	15751881480165	2
15921917957796	15782398324826	2
15921917957796	15782401353207	2
15922346290208	15714589149401	0
15776775042945	15782398324826	2
15782413529296	15782398324826	2
\.


--
-- TOC entry 3001 (class 0 OID 16402)
-- Dependencies: 200
-- Data for Name: positions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.positions (id, name, created_at, updated_at) FROM stdin;
1	Management	1567937957503	\N
2	Team Leader	1567937957503	\N
3	Human Resource	1567937957503	\N
4	Staff	1567937957503	\N
\.


--
-- TOC entry 3002 (class 0 OID 16405)
-- Dependencies: 201
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, title, description, state, created_at, updated_at) FROM stdin;
15776774274194	Website thương mại điện tử	Xây dựng website thương mại điện tử với Reactjs	0	1577677427419	1577677427419
15776775042945	Website bán điện thoại	Xây dựng website như thế giới di động	0	1577677504295	1577677504295
15782413529296	Website bán quần áo	Bán quần áo chuyên về đồ nam	0	1578241352980	1578241352980
15782413529787	Website bán quần áo	Bán quần áo chuyên về đồ nam	0	1578241352980	1578241352980
15921917957796	Payment Connector	<p>Cổng kết nối v&agrave; quản l&yacute; v&iacute; blockchain</p>\n	0	1592191795785	1592191795785
15922346290208	Fvp	<p>Hệ thống đầu tư</p>\n	0	1592234629021	1592234629021
\.


--
-- TOC entry 3003 (class 0 OID 16411)
-- Dependencies: 202
-- Data for Name: requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.requests (id, employeeid, name, "position", timestart, timeend, reason, confirm) FROM stdin;
15781546165702	15714589149401	Huỳnh Lê Hữu Hưng	Management	1579277760000	1579364160000	Có việc riêng	f
15781546341123	15714589149401	Huỳnh Lê Hữu Hưng	Management	1579277760000	1578241020000	Đi khám bệnh	t
15782412682294	15782398324826	Pham Ngoc Dieu	Staff	1578241235742	1578327600000	Vào ngân hàng làm thủ tục	f
15782425877254	15782405203918	Phan Thị  Thùy  Dương	Staff	1575218520000	1575304920000	Về quê có việc gấp	f
15782410853822	15782405203918	Phan Thị  Thùy  Dương	Staff	1576599420000	1576685820000	Đi họp phụ huynh cho con	t
15782409956701	15751881480165	Thai Thanh  Liem	Team Leader	1575994560000	1576080960000	Bị đau mắt	t
\.


--
-- TOC entry 3004 (class 0 OID 16417)
-- Dependencies: 203
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name, created_at, updated_at) FROM stdin;
1	ROLE_ADMIN	1567937957503	1567937957503
2	ROLE_STAFF	1567937962314	1567937962314
3	ROLE_LEAD	1567937962314	1567937962314
4	ROLE_HR	1567937962314	1567937962314
\.


--
-- TOC entry 3005 (class 0 OID 16423)
-- Dependencies: 204
-- Data for Name: taskcomments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.taskcomments (id, task_id, employee_id, comment, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3006 (class 0 OID 16429)
-- Dependencies: 205
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (id, project_id, title, started_at, duration, state, point, employee_creator, description, created_at, updated_at, employee_assignee, pre_task_id) FROM stdin;
15782700612879	15782413529787	Chức năng quản lý sản phẩm	1580084220000	5	5	5	15751881480165	Thực hiện bằng reactjs tren web , react native trên moblie	1578270061329	1578273286299	15782407734329	\N
15776776576042	15776775042945	Phân tích xử lý	1577677608760	\N	5	5	15714589149401	Phân tích các chức năng có thể có	1577677657604	1592671004799	15714589149401	\N
15776777180033	15776775042945	Giám sát quy trình	1577677664519	\N	5	1	15714589149401	Đảm bảo đúng tiến độ với kế hoạch	1577677718040	1592655861901	15714589149401	
15927075807492	15921917957796	[BE] Research gRPC protocol	1592707489054	2	0	0	15714589149401	gRPC là gì ?\nSử dụng gRPC như thế nào	1592707580750	1592707586420	15751881480165	
15782696929356	15782413529787	Chức năng xem sản phẩm	1578960720000	3	1	5	15751881480165	Có thể chọn các loại, theo giá, theo màu	1578269692936	1578274182717	15782401353207	\N
15782698474708	15782413529787	Thiết kế giao diện 	1579133760000	6	5	4	15751881480165	Sử dung biểu mẫu và use-case để thực hiện	1578269847470	1578269889725	15782407734329	\N
15782701408610	15782413529787	Dựng server trên aws	1580084460000	2	5	4	15751881480165	Chạy trên nền Ubuntu , Docker 	1578270140862	1578288761547	15782401353207	\N
15776777978154	15776775042945	Xây dựng API tính năng mua hàng	1577677749221	\N	2	0	15714589149401	Xây dựng api cho tính năng mua hàng	1577677797835	1592670973396	15714589149401	\N
15776780298297	15776775042945	Xây dựng API đăng nhập	1577677985459	\N	3	0	15714589149401	Xây dựng tính năng đăng nhập với mạng xã hội hiện có	1577678029829	1592670973396	15714589149401	\N
15782414591315	15782413529787	Mô tả use-case	1578241354076	3	0	0	15751881480165	Chi tiết cho từng chức năng 	1578241459166	1578241488810	15782407734329	\N
15782415862616	15782413529787	Thiết kế biểu mẫu	1578241495510	6	4	5	15751881480165	Xây dựng rõ ràng chi tiết cho từng form	1578241586261	1578270520073	15782401353207	\N
15782697714607	15782413529787	Chức năng thanh toán	1578874440000	5	5	4	15751881480165	Cần cho thanh toán qua thẻ của tất cả ngân hàng	1578269771461	1578270598534	15751881480165	\N
15782716755476	15776774274194	Thu thập thông tin 	1575161160000	2	0	0	15751881480165	Tìm kiểm đánh giá sản phẩm sắp thực hiện 	1578271675548	1578271675548	15714589149401	\N
15782718038678	15776774274194	Thiết kế CSDL	1575852540000	3	0	0	15751881480165	Bằng postgress	1578271803868	1578271803868	15751881480165	\N
15782729221470	15782413529296	Chức năng đăng nhập 	1578013680000	5	5	4	15751881480165	chức năng đăng nhập	1578272922147	1578272973912	15782405203918	\N
15782695562435	15782413529787	Chức năng đăng nhập	1578874260000	3	2	5	15751881480165	Có gg authentica	1578269556244	1578274184074	15782401353207	\N
15782416909167	15782413529787	Mô tả DB	1578846360000	4	3	5	15751881480165	Nêu ra rõ các bảng và mối quan hệ	1578241690916	1578275764929	15751881480165	\N
15782717407117	15776774274194	Thiết kế biểu mẫu	1575420420000	4	0	0	15751881480165	Chỉ tiết các form có thể xuất hiện 	1578271740711	1591425813387	15782398324826	\N
15782728829399	15782413529296	Xác định yêu cầu	1578272760000	2	0	0	15751881480165	Xác định yêu cầu	1578272882939	1592708929181	15751881480165	\N
15782710871615	15782413529296	Mô tả dữ liệu 	1578011760000	1	0	0	15751881480165	full chức năng	1578271087162	1592708952698	15782398324826	\N
15776779867316	15776775042945	Giám sát quy trình triển khai	1577677927342	\N	5	3	15714589149401	Đảm bảo quy trình triển khai đúng kế hoạch	1577677986731	1592648207021	15751881480165	
15782888628711	15782413529787	xây dựng host	1580362320000	1	0	0	15751881480165	OS : Ubuntu	1578288862873	1592673121237	15751881480165	\N
15782702328641	15782413529787	Dựng dbservice 	1579479720000	4	0	0	15751881480165	Control giữa database và app	1578270232864	1592672182511	15751881480165	\N
15782704812173	15782413529787	Chức năng thống kê	1579825620000	4	0	0	15751881480165	Theo sản phẩm, theo giá bán , doanh thu	1578270481217	1592672182511	15751881480165	\N
15782704253822	15782413529787	Chức năng search 123	1579134180000	7	0	0	15751881480165	Tìm kiếm tất cả sản phẩm	1578270425382	1592672623866	15751881480165	\N
15782709970624	15782413529296	Gặp khách hàng	1577838900000	5	0	0	15751881480165	Gửi mail cho khách hàng hẹn gặp mặt	1578270997063	1592675160912	15751881480165	\N
15921919342737	15921917957796	[BE] Research database cluster	1592191801687	2	0	0	15714589149401	Tìm hiểu về cách thao tác với dữ liệu lớn	1592191934274	1592707502327	15714589149401	
15926292745059	15776774274194	Test chức năng update	1592629119694	2	4	5	15714589149401	Thực hiện update 1 task bất kì	1592629274506	1592631128833	15782398324826	15914257228033
15776778448415	15776775042945	Giám sát quy trình kiểm thử	1577677802796	1	1	4	15714589149401	Đảm bảo đi đúng kế hoạch	1577677844877	1592671004799	15714589149401	
15926384053251	15776774274194	Test load card 2	1592638369986	4	0	0	15714589149401	123123123123	1592638405325	1592638439100	15782398324826	
15914257228033	15776774274194	Chọn Công Nghệ	1591425672732	3	0	0	15751881480165	Vd: Java, React	1591425722804	1592638486271	15782401353207	15782718038678
15926383699530	15776774274194	Test load card task	1592638089462	2	0	0	15714589149401	12 34 	1592638369954	1592638510320	15782398324826	
15776775543901	15776775042945	Khảo sát hiện trạng	1577677515118	\N	0	0	15714589149401	Tìm hiểu các website hiện có trên thị trường	1577677554390	1592707396199	15714589149401	
15781417459898	15776775042945	Thiết kế biểu mẫu login	1578141684385	2	5	2	15714589149401	Mô tả chi tiết từng biểu biểu login	1578141746000	1592655850249	15751881480165	15776777180033
15781650578270	15776775042945	Kiểm thử xem hàng	1578164992279	3	4	0	15714589149401	Thực hiện kiểm thử chức năng xem danh sách sản phẩm	1578165057828	1592670973396	15714589149401	
15781633960389	15776775042945	Kiểm thử hoá đơn	1578163336617	2	0	0	15714589149401	Thực hiện kiểm thử chức năng xem đơn hàng	1578163396038	1592670973396	15714589149401	15776779867316
15781633349228	15776775042945	Kiểm thử mua hàng	1578163190347	1	0	\N	15714589149401	Thực hiện kiểm thử chức năng mua danh sách sản phẩm	1578163334925	1592707452962	15782398324826	15776776576042
\.


--
-- TOC entry 3007 (class 0 OID 16435)
-- Dependencies: 206
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles (user_id, role_id, created_at, updated_at) FROM stdin;
15714589149401	1	1571458915069	1571458915069
15714589149401	3	1571458915069	1571458915069
15714589149401	2	1571458915069	1571458915069
15714589149401	4	1571458915069	1571458915069
15746072843063	3	1574785905117	1574785905117
15746072843063	2	1574785905118	1574785905118
15751881480165	1	1575188192653	1575188192653
15751881480165	2	1575188192655	1575188192655
15751881480165	3	1575188192656	1575188192656
15751881480165	4	1575188192656	1575188192656
15746074348584	2	1577678249443	1577678249443
15782398324826	2	1578240857443	1578240857443
15782398324826	4	1578240857444	1578240857444
15782401353207	2	1578240877551	1578240877551
15782405203918	4	1578240897965	1578240897965
15782407734329	2	1578240931391	1578240931391
15782708385800	2	1591425988349	1591425988349
\.


--
-- TOC entry 3008 (class 0 OID 16438)
-- Dependencies: 207
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, phone, password, provider, provider_id, oauth2_name, image_url, email_verified, created_at, updated_at, status) FROM stdin;
15714589149401	huuhung9822@gmail.com	0938781162	$2a$10$uPjQ.ZhoRY1mqiWvSupRUOyXWM0yR7MoHix85oRk.Ls7BY/K8pXIq	google	107889025848008063650	Hưng Huỳnh	https://lh4.googleusercontent.com/-vao6VCfseGo/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reIFx6E9VfOMlCmZEleSK2kvEAJFg/photo.jpg	t	1571458915068	\N	1
15746072843063	test.lead.1@gmail.com	0909456123	$2a$10$QSzWFRz83r2eQnels2WUXuoKDc3EjiH/TPWqub95mTJQCXrSXslxa	local	\N	\N	\N	f	1574607284406	1574785905109	1
15746071512232	test.staff.1@gmail.com	0909123456	$2a$10$TX/fSfJQuSENRFVu5GJkyO7LgWJMIzIyHt4mWDPtVfPqn1zOVX8wS	local	\N	\N	\N	f	1574607151398	1577676436907	2
15746074348584	test.staff.2@gmail.com	0909654321	$2a$10$n39S1dPWhOjO.sz2Kzf85.VcyASAV1RbcqXD/o.O60sKGYElUO51m	local	\N	\N	\N	f	1574607434956	1577678249435	1
15782398324826	dieu@gmail.com	0909457835	$2a$10$LH2l5uDfK4K.9ZK79xpae.ZarRYMKHic5oorXBfpPlbW7V5x3UC9a	local	\N	\N	\N	f	1578239832614	1578240857435	1
15782401353207	tan@gmail.com	0909435123	$2a$10$ohM5A5fD3jjS8Ed08H4H/uIN5hbp7YCFuEPIxo7S.2RCwwE5j3xfC	local	\N	\N	\N	f	1578240135421	1578240877542	1
15782405203918	duong@gmail.com	0909423765	$2a$10$C1HjXuxHaHo.eFaScMC3X.lt..n5j.B4GDdFXruNWu6Fr0WGKDBe6	local	\N	\N	\N	f	1578240520489	1578240897954	1
15782407734329	duyen@gmail.com	0984763751	$2a$10$q1eIeuwEE/af2t9Xjlj9ue17oC7uljSaA6ZubayE.2vivjLXIm.Ci	local	\N	\N	\N	f	1578240773532	1578240931382	1
15751881480165	thaithanhliem2704@gmail.com	0961375203	$2a$10$m9wfg.0ZBrIsjCVM9zBHKu3yO3X2Ti8RPNR787RvM9eWT/eFJOTHO	google	117054783354917662920	thai thanh liem	https://lh5.googleusercontent.com/--F14Dt13l_M/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn9c0-QXMxqWBk56a_ednh9DcsW3w/photo.jpg	t	1575188148420	1578149629377	1
15782708385800	phuc@gmail.com	098756351	$2a$10$R7FnMro/EmdxYBKxOR5AJeqQ2Od5.n919zFHQwr1aLFJXDZqknJuq	local	\N	\N	\N	f	1578270838675	1591425988342	1
\.


--
-- TOC entry 3009 (class 0 OID 16444)
-- Dependencies: 208
-- Data for Name: webhook; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.webhook (id_webhook, id_project, bot_token, chat_id, create_task, update_task, update_state, name_webhook) FROM stdin;
15915200391321	789	bot938908907:AAH7QNkQXX4CQzOHsXQR6NT4u9M7EfWMhmE	-407375047	t	t	t	telegram_project_1
15915200326730	456	bot938908907:AAH7QNkQXX4CQzOHsXQR6NT4u9M7EfWMhmE	-407375047	t	t	t	telegram_project_2
15915199978979	123	bot938908907:AAH7QNkQXX4CQzOHsXQR6NT4u9M7EfWMhmE	-407375047	t	t	t	telegram_project_3
15915200739942	123	bot938908907:AAH7QNkQXX4CQzOHsXQR6NT4u9M7EfWMhmE	-407375047	t	t	t	telegram
\.


--
-- TOC entry 3011 (class 0 OID 16545)
-- Dependencies: 210
-- Data for Name: wiki; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.wiki (wiki_id, wiki_title, project_id, created_by, path, content, state, created_at, updated_at) FROM stdin;
15920378398961	test0	1	1	/	Project 1	0	\N	\N
15920379208971	test0-1	1	1	/15920378398961/	Project 1 - Child of 15920378398961	0	\N	\N
15920379259551	test0-2	1	1	/15920378398961/	Project 1 - Child of 15920378398961	0	\N	\N
\.


--
-- TOC entry 3018 (class 0 OID 0)
-- Dependencies: 209
-- Name: webhook_id_webhook_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.webhook_id_webhook_seq', 1, false);


--
-- TOC entry 2849 (class 2606 OID 16454)
-- Name: roles Roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY (id);


--
-- TOC entry 2855 (class 2606 OID 16456)
-- Name: user_roles employee_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT employee_roles_pkey PRIMARY KEY (user_id, role_id);


--
-- TOC entry 2839 (class 2606 OID 16458)
-- Name: notify notify_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notify
    ADD CONSTRAINT notify_pkey PRIMARY KEY (id);


--
-- TOC entry 2841 (class 2606 OID 16460)
-- Name: perofproject perofproject_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perofproject
    ADD CONSTRAINT perofproject_pkey PRIMARY KEY (pro_id, employee_id);


--
-- TOC entry 2843 (class 2606 OID 16462)
-- Name: positions positions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.positions
    ADD CONSTRAINT positions_pkey PRIMARY KEY (id);


--
-- TOC entry 2845 (class 2606 OID 16464)
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- TOC entry 2847 (class 2606 OID 16466)
-- Name: requests requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_pkey PRIMARY KEY (id);


--
-- TOC entry 2851 (class 2606 OID 16468)
-- Name: taskcomments taskcomments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taskcomments
    ADD CONSTRAINT taskcomments_pkey PRIMARY KEY (id);


--
-- TOC entry 2853 (class 2606 OID 16470)
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- TOC entry 2857 (class 2606 OID 16472)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2859 (class 2606 OID 16474)
-- Name: webhook webhook_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.webhook
    ADD CONSTRAINT webhook_pkey PRIMARY KEY (id_webhook);


--
-- TOC entry 2861 (class 2606 OID 16552)
-- Name: wiki wiki_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wiki
    ADD CONSTRAINT wiki_pkey PRIMARY KEY (wiki_id);


--
-- TOC entry 2869 (class 2606 OID 16475)
-- Name: taskcomments comment_of_employee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taskcomments
    ADD CONSTRAINT comment_of_employee FOREIGN KEY (employee_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2870 (class 2606 OID 16480)
-- Name: taskcomments comment_of_task; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taskcomments
    ADD CONSTRAINT comment_of_task FOREIGN KEY (task_id) REFERENCES public.tasks(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2864 (class 2606 OID 16485)
-- Name: notify creator_employee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notify
    ADD CONSTRAINT creator_employee FOREIGN KEY (create_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2871 (class 2606 OID 16490)
-- Name: tasks employee_assignee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT employee_assignee FOREIGN KEY (employee_assignee) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2872 (class 2606 OID 16495)
-- Name: tasks employee_creator; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT employee_creator FOREIGN KEY (employee_creator) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2862 (class 2606 OID 16500)
-- Name: employees employee_position; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employee_position FOREIGN KEY (position_id) REFERENCES public.positions(id);


--
-- TOC entry 2866 (class 2606 OID 16505)
-- Name: perofproject employee_project; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perofproject
    ADD CONSTRAINT employee_project FOREIGN KEY (employee_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2873 (class 2606 OID 16510)
-- Name: tasks of_project; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT of_project FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2867 (class 2606 OID 16515)
-- Name: perofproject project_constraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perofproject
    ADD CONSTRAINT project_constraint FOREIGN KEY (pro_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2865 (class 2606 OID 16520)
-- Name: notify receiver_employee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notify
    ADD CONSTRAINT receiver_employee FOREIGN KEY (receive_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2868 (class 2606 OID 16525)
-- Name: requests request_of; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT request_of FOREIGN KEY (employeeid) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2874 (class 2606 OID 16530)
-- Name: user_roles role_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT role_id FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2863 (class 2606 OID 16535)
-- Name: employees user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT user_id FOREIGN KEY (id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2875 (class 2606 OID 16540)
-- Name: user_roles user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2020-06-21 10:14:13 +07

--
-- PostgreSQL database dump complete
--

