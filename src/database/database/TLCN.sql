--
-- PostgreSQL database dump
--

-- Dumped from database version 10.13
-- Dumped by pg_dump version 12.3

-- Started on 2020-07-28 00:13:45 +07

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
-- TOC entry 210 (class 1259 OID 16452)
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
-- TOC entry 2837 (class 2604 OID 16458)
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
15950450062991	1595045006469	1595045006469	Nami	Bot	Test	24423536245626	1595044927800	TpHCM	Quận 6	4	123456	Nami	Phu Lam	1595044927800	1595044927800
15950503065742	1595050306728	1595050306728	Phan	Văn Phước	Thịnh	0122420234	1595049976507	Bến Tre	Quận Thủ Đức 	2	34534563	ACB	Thu Duc	1595049976507	1595049960000
\.


--
-- TOC entry 2998 (class 0 OID 16390)
-- Dependencies: 197
-- Data for Name: genuid; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genuid (id, index, count) FROM stdin;
2	3	233
1	2	12
3	8	48
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
15781570573547	15714589149401	Huỳnh Lê Hữu Hưng	1578157057256	Ngày 10/1/2020 , Sẽ phát thưởng tết cho nhân viên	15751881480165	t
15781570573124	15714589149401	Huỳnh Lê Hữu Hưng	1578157057256	Ngày 10/1/2020 , Sẽ phát thưởng tết cho nhân viên	15714589149401	t
15781565073560	15714589149401	Huỳnh Lê Hữu Hưng	1578156507301	Team backend 3h họp 	15714589149401	t
15782423044988	15751881480165	Thai Thanh  Liem	1578242298493	Tuần sau , Cty sẽ có một buổi tổng vệ sinh nha các ace	15782407734329	f
15782423051792	15751881480165	Thai Thanh  Liem	1578242298493	Tuần sau , Cty sẽ có một buổi tổng vệ sinh nha các ace	15714589149401	f
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
15782424606022	15751881480165	Thai Thanh  Liem	1578242460080	Team nhân sự, chiều nay họp ở phòng 2 nha	15782407734329	f
15782424606433	15751881480165	Thai Thanh  Liem	1578242460080	Team nhân sự, chiều nay họp ở phòng 2 nha	15782405203918	f
15782424602838	15751881480165	Thai Thanh  Liem	1578242460080	Team nhân sự, chiều nay họp ở phòng 2 nha	15746074348584	f
15782424601966	15751881480165	Thai Thanh  Liem	1578242460080	Team nhân sự, chiều nay họp ở phòng 2 nha	15714589149401	t
15781555385754	15714589149401	Huỳnh Lê Hữu Hưng	1578155537992	Ngay 1/1/2020 , Mọi người được nghỉ nhé!!	15751881480165	t
15782424604931	15751881480165	Thai Thanh  Liem	1578242460080	Team nhân sự, chiều nay họp ở phòng 2 nha	15751881480165	t
15927103063515	15751881480165	Thai Thanh  Liem	1592710306115	Ngày 20/06/2020 , Công ty được người buổi chiều 	15782398324826	f
15927103063424	15751881480165	Thai Thanh  Liem	1592710306115	Ngày 20/06/2020 , Công ty được người buổi chiều 	15782708385800	f
15927103063626	15751881480165	Thai Thanh  Liem	1592710306115	Ngày 20/06/2020 , Công ty được người buổi chiều 	15714589149401	f
15927103064317	15751881480165	Thai Thanh  Liem	1592710306115	Ngày 20/06/2020 , Công ty được người buổi chiều 	15746074348584	f
15927103064378	15751881480165	Thai Thanh  Liem	1592710306115	Ngày 20/06/2020 , Công ty được người buổi chiều 	15746072843063	f
15927103064850	15751881480165	Thai Thanh  Liem	1592710306115	Ngày 20/06/2020 , Công ty được người buổi chiều 	15782405203918	f
15927103064941	15751881480165	Thai Thanh  Liem	1592710306115	Ngày 20/06/2020 , Công ty được người buổi chiều 	15782407734329	f
15927103065132	15751881480165	Thai Thanh  Liem	1592710306115	Ngày 20/06/2020 , Công ty được người buổi chiều 	15782401353207	f
15927103064559	15751881480165	Thai Thanh  Liem	1592710306115	Ngày 20/06/2020 , Công ty được người buổi chiều 	15751881480165	t
15950494386874	15751881480165	Thai Thanh  Liem	1595049438556	Team building tháng 7 vào ngày 27-7	15746072843063	f
15950494387095	15751881480165	Thai Thanh  Liem	1595049438556	Team building tháng 7 vào ngày 27-7	15746074348584	f
15950494387156	15751881480165	Thai Thanh  Liem	1595049438556	Team building tháng 7 vào ngày 27-7	15782398324826	f
15950494387467	15751881480165	Thai Thanh  Liem	1595049438556	Team building tháng 7 vào ngày 27-7	15714589149401	f
15950494387738	15751881480165	Thai Thanh  Liem	1595049438556	Team building tháng 7 vào ngày 27-7	15782401353207	f
15950494387899	15751881480165	Thai Thanh  Liem	1595049438556	Team building tháng 7 vào ngày 27-7	15782405203918	f
15950494388040	15751881480165	Thai Thanh  Liem	1595049438556	Team building tháng 7 vào ngày 27-7	15782407734329	f
15950494388111	15751881480165	Thai Thanh  Liem	1595049438556	Team building tháng 7 vào ngày 27-7	15782708385800	f
15950494388452	15751881480165	Thai Thanh  Liem	1595049438556	Team building tháng 7 vào ngày 27-7	15751881480165	f
15950494388503	15751881480165	Thai Thanh  Liem	1595049438556	Team building tháng 7 vào ngày 27-7	15950450062991	f
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
15782413529787	15782407734329	2
15921917957796	15714589149401	0
15921917957796	15751881480165	2
15921917957796	15782398324826	2
15921917957796	15782401353207	2
15922346290208	15714589149401	0
15776775042945	15782398324826	2
15782413529296	15782398324826	2
15776774274194	15751881480165	1
15776775042945	15782407734329	2
15782413529296	15782407734329	1
15922346290208	15782398324826	2
15922346290208	15782401353207	1
15922346290208	15782708385800	2
15938430081286	15751881480165	0
15938430081286	15746072843063	2
15938430081286	15714589149401	2
15938430081286	15782398324826	2
15776774274194	15950450062991	2
15950519647398	15950503065742	0
15950519647398	15751881480165	1
15950519647398	15782398324826	2
15950519647398	15782407734329	2
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
15938430081286	Gantt Project	Test gantt char để tính đường găng	0	1593843008133	1593843008133
15950519647398	SIM	System 	0	1595051964741	1595051964741
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
15782410853822	15782405203918	Phan Thị  Thùy  Dương	Staff	1576599420000	1576685820000	Đi họp phụ huynh cho con	t
15782409956701	15751881480165	Thai Thanh  Liem	Team Leader	1575994560000	1576080960000	Bị đau mắt	t
15782425877254	15782405203918	Phan Thị  Thùy  Dương	Staff	1575218520000	1575304920000	Về quê có việc gấp	t
15950479197043	15950450062991	Nami Bot Test	Staff	1595307000000	1595393400000	Xin nhỏ phép	t
\.


--
-- TOC entry 3004 (class 0 OID 16417)
-- Dependencies: 203
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name, created_at, updated_at) FROM stdin;
1	ROLE_ADMIN	1567937957503	1567937957503
2	ROLE_LEAD	1567937962314	1567937962314
3	ROLE_HR	1567937962314	1567937962314
4	ROLE_STAFF	1567937962314	1567937962314
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
15782415862616	15782413529787	Thiết kế biểu mẫu	1578241495510	6	5	5	15751881480165	Xây dựng rõ ràng chi tiết cho từng form	1578241586261	1592731329063	15782401353207	
15782696929356	15782413529787	Chức năng xem sản phẩm	1578960720000	3	1	5	15751881480165	Có thể chọn các loại, theo giá, theo màu	1578269692936	1578274182717	15782401353207	\N
15782701408610	15782413529787	Dựng server trên aws	1580084460000	2	5	4	15751881480165	Chạy trên nền Ubuntu , Docker 	1578270140862	1578288761547	15782401353207	\N
15782414591315	15782413529787	Mô tả use-case	1578241354076	3	0	0	15751881480165	Chi tiết cho từng chức năng 	1578241459166	1578241488810	15782407734329	\N
15782697714607	15782413529787	Chức năng thanh toán	1578874440000	5	5	4	15751881480165	Cần cho thanh toán qua thẻ của tất cả ngân hàng	1578269771461	1578270598534	15751881480165	\N
15926292745059	15776774274194	Test chức năng update	1591722000000	2	4	5	15714589149401	Thực hiện update 1 task bất kì	1592629274506	1593395010958	15782398324826	15914257228033
15782729221470	15782413529296	Chức năng đăng nhập 	1578013680000	5	5	4	15751881480165	chức năng đăng nhập	1578272922147	1578272973912	15782405203918	\N
15782695562435	15782413529787	Chức năng đăng nhập	1578874260000	3	2	5	15751881480165	Có gg authentica	1578269556244	1578274184074	15782401353207	\N
15782416909167	15782413529787	Mô tả DB	1578846360000	4	3	5	15751881480165	Nêu ra rõ các bảng và mối quan hệ	1578241690916	1578275764929	15751881480165	\N
15776779867316	15776775042945	Giám sát quy trình triển khai	1577677927342	\N	5	3	15714589149401	Đảm bảo quy trình triển khai đúng kế hoạch	1577677986731	1595044174867	15751881480165	
15782888628711	15782413529787	xây dựng host	1580362320000	1	0	0	15751881480165	OS : Ubuntu	1578288862873	1592673121237	15751881480165	\N
15782704253822	15782413529787	Chức năng search 123	1579134180000	7	0	0	15751881480165	Tìm kiếm tất cả sản phẩm	1578270425382	1592672623866	15751881480165	\N
15782709970624	15782413529296	Gặp khách hàng	1577838900000	5	5	5	15751881480165	Gửi mail cho khách hàng hẹn gặp mặt	1578270997063	1592731419710	15751881480165	
15950489514897	15776774274194	Thiết kế giao diện app	1595048896031	5	2	0	15751881480165	Thiết kế giao diện app	1595048951490	1595049123082	15950450062991	
15781633960389	15776775042945	Kiểm thử hoá đơn	1578163336617	2	0	0	15714589149401	Thực hiện kiểm thử chức năng xem đơn hàng	1578163396038	1592710057691	15782398324826	15776779867316
15782710871615	15782413529296	Mô tả dữ liệu 	1578011760000	1	5	5	15751881480165	full chức năng	1578271087162	1592731432356	15782398324826	
15782728829399	15782413529296	Xác định yêu cầu	1578272760000	2	5	5	15751881480165	Xác định yêu cầu	1578272882939	1592731401156	15751881480165	
15926383699530	15776774274194	Test load card task	1592638089462	2	0	0	15714589149401	12 34 	1592638369954	1593929227304	15782398324826	
15926384053251	15776774274194	Test load card 2	1592638369986	4	0	0	15714589149401	123123123123	1592638405325	1593395208879	15751881480165	
15776775543901	15776775042945	Khảo sát hiện trạng	1577677515118	\N	0	0	15714589149401	Tìm hiểu các website hiện có trên thị trường	1577677554390	1595044170456	15751881480165	
15776777978154	15776775042945	Xây dựng API tính năng mua hàng	1577677749221	\N	2	0	15714589149401	Xây dựng api cho tính năng mua hàng	1577677797835	1592710125082	15714589149401	\N
15914257228033	15776774274194	Chọn Công Nghệ	1591425672732	3	0	0	15714589149401	Vd: Java, React	1591425722804	1592898005793	15782401353207	15782718038678
15782717407117	15776774274194	Thiết kế biểu mẫu	1575219600000	4	0	0	15714589149401	Chỉ tiết các form có thể xuất hiện 	1578271740711	1592898010072	15714589149401	15782716755476
15921919342737	15921917957796	[BE] Research database cluster	1592154000000	4	0	0	15714589149401	Tìm hiểu về cách thao tác với dữ liệu lớn	1592191934274	1592718547806	15714589149401	
15782702328641	15782413529787	Dựng dbservice 	1579194000000	4	0	0	15751881480165	Control giữa database và app	1578270232864	1592898320873	15751881480165	\N
15927075807492	15921917957796	[BE] Research gRPC protocol	1592758800000	1	0	0	15714589149401	gRPC là gì ?\nSử dụng gRPC như thế nào	1592707580750	1592718631487	15751881480165	
15781650578270	15776775042945	Kiểm thử xem hàng	1578164992279	3	4	0	15714589149401	Thực hiện kiểm thử chức năng xem danh sách sản phẩm	1578165057828	1592718743402	15714589149401	15776780298297
15781417459898	15776775042945	Thiết kế biểu mẫu login	1578243600000	2	5	2	15714589149401	Mô tả chi tiết từng biểu biểu login	1578141746000	1592719058461	15751881480165	15776777180033
15927312769983	15776774274194	Dump database	1592731144985	4	0	0	15751881480165	Backup database	1592731276999	1593929231412	15714589149401	
15781633349228	15776775042945	Kiểm thử mua hàng	1577984400000	1	0	\N	15714589149401	Thực hiện kiểm thử chức năng mua danh sách sản phẩm	1578163334925	1594439552699	15782407734329	15776776576042
15782718038678	15776774274194	Thiết kế CSDL	1575852540000	3	0	0	15714589149401	Bằng postgress	1578271803868	1592898097492	15782398324826	15782717407117
15782716755476	15776774274194	Thu thập thông tin 	1574960400000	2	0	0	15714589149401	Tìm kiểm đánh giá sản phẩm sắp thực hiện 	1578271675548	1592898112422	15782401353207	\N
15782698474708	15782413529787	Thiết kế giao diện 	1579194000000	6	5	4	15751881480165	Sử dung biểu mẫu và use-case để thực hiện	1578269847470	1592898324925	15782407734329	\N
15776778448415	15776775042945	Giám sát quy trình kiểm thử	1577811600000	1	5	4	15714589149401	Đảm bảo đi đúng kế hoạch	1577677844877	1595044202852	15782407734329	
15776780298297	15776775042945	Xây dựng API đăng nhập	1577552400000	1	5	0	15714589149401	Xây dựng tính năng đăng nhập với mạng xã hội hiện có	1577678029829	1595044408960	15782398324826	
15938432611527	15938430081286	A	1593795600000	3	0	0	15751881480165	a	1593843261154	1595172286094	15751881480165	
15782704812173	15782413529787	Chức năng thống kê	1579825620000	4	0	0	15751881480165	Theo sản phẩm, theo giá bán , doanh thu	1578270481217	1592721110810	15782407734329	\N
15938442116384	15938430081286	G	1594573200000	2	0	0	15751881480165	g	1593844211644	1595866989860	15714589149401	15938433333068
15938433333068	15938430081286	B	1593795600000	5	3	0	15751881480165	B	1593843333306	1595869586220	15714589149401	
15938434965090	15938430081286	D	1594573200000	2	0	0	15751881480165	D	1593843496510	1595784557305	15751881480165	15938432611527
15938441785793	15938430081286	H	1594746000000	6	0	0	15751881480165	h	1593844178580	1595858422641	15782398324826	15938433832359,15938434965090,15938435997321
15938433832359	15938430081286	C	1594054800000	4	2	\N	15751881480165	c	1593843383235	1595862618206	15746072843063	15938432611527
15938437931602	15938430081286	F	1595178000000	1	1	0	15751881480165	f	1593843793161	1595786061997	15782398324826	15938433832359
15938442563865	15938430081286	I	1595264400000	6	0	0	15751881480165	i	1593844256389	1595175440294	15782398324826	15938441785793,15938442116384
15933213485654	15922346290208	Mô tả ứng dụng 	1593277200000	2	0	0	15751881480165	Liệt kê chức năng chi tiết	1593321348567	1595176165779	15782398324826	
15938435997321	15938430081286	E	1594054800000	8	0	0	15751881480165	e	1593843599732	1595858402580	15714589149401	15938432611527
15938442951536	15938430081286	K	1595782800000	11	0	0	15751881480165	k	1593844295155	1595859967175	15714589149401	15938437931602,15938442563865
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
15950450062991	2	1595047139244	1595047139244
15950503065742	3	1595050525459	1595050525459
15950503065742	2	1595050525460	1595050525460
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
15950450062991	nami@gmail.com	0961375204	$2a$10$/XQEncjZCyCrIZhvOcWED.F7uaEVegdNCQK5wYxNObjQfZR7d6WFi	local	\N	\N	\N	f	1595045006466	1595047139237	1
15950503065742	thinh@gmail.com	0909438004	$2a$10$sUafWz4PcDmE3zMU8xqqcuIC02OHnapr17Zr/4/QjTfoW/Gqu4iYy	local	\N	\N	\N	f	1595050306726	1595050525450	1
\.


--
-- TOC entry 3009 (class 0 OID 16444)
-- Dependencies: 208
-- Data for Name: webhook; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.webhook (id_webhook, id_project, bot_token, chat_id, create_task, update_task, update_state, name_webhook) FROM stdin;
\.


--
-- TOC entry 3011 (class 0 OID 16452)
-- Dependencies: 210
-- Data for Name: wiki; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.wiki (wiki_id, wiki_title, project_id, created_by, path, content, state, created_at, updated_at) FROM stdin;
15920378398961	test0	1	1	/	Project 1	0	\N	\N
15920379208971	test0-1	1	1	/15920378398961/	Project 1 - Child of 15920378398961	0	\N	\N
15920379259551	test0-2	1	1	/15920378398961/	Project 1 - Child of 15920378398961	0	\N	\N
15928973481731	liem test wiki	\N	15751881480165	/		0	\N	\N
15928973702891	liem test wiki / 1	\N	15751881480165	/15928973481731/		0	\N	\N
\.


--
-- TOC entry 3018 (class 0 OID 0)
-- Dependencies: 209
-- Name: webhook_id_webhook_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.webhook_id_webhook_seq', 1, false);


--
-- TOC entry 2849 (class 2606 OID 16460)
-- Name: roles Roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY (id);


--
-- TOC entry 2855 (class 2606 OID 16462)
-- Name: user_roles employee_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT employee_roles_pkey PRIMARY KEY (user_id, role_id);


--
-- TOC entry 2839 (class 2606 OID 16464)
-- Name: notify notify_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notify
    ADD CONSTRAINT notify_pkey PRIMARY KEY (id);


--
-- TOC entry 2841 (class 2606 OID 16466)
-- Name: perofproject perofproject_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perofproject
    ADD CONSTRAINT perofproject_pkey PRIMARY KEY (pro_id, employee_id);


--
-- TOC entry 2843 (class 2606 OID 16468)
-- Name: positions positions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.positions
    ADD CONSTRAINT positions_pkey PRIMARY KEY (id);


--
-- TOC entry 2845 (class 2606 OID 16470)
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- TOC entry 2847 (class 2606 OID 16472)
-- Name: requests requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_pkey PRIMARY KEY (id);


--
-- TOC entry 2851 (class 2606 OID 16474)
-- Name: taskcomments taskcomments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taskcomments
    ADD CONSTRAINT taskcomments_pkey PRIMARY KEY (id);


--
-- TOC entry 2853 (class 2606 OID 16476)
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- TOC entry 2857 (class 2606 OID 16478)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2859 (class 2606 OID 16480)
-- Name: webhook webhook_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.webhook
    ADD CONSTRAINT webhook_pkey PRIMARY KEY (id_webhook);


--
-- TOC entry 2861 (class 2606 OID 16482)
-- Name: wiki wiki_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wiki
    ADD CONSTRAINT wiki_pkey PRIMARY KEY (wiki_id);


--
-- TOC entry 2869 (class 2606 OID 16483)
-- Name: taskcomments comment_of_employee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taskcomments
    ADD CONSTRAINT comment_of_employee FOREIGN KEY (employee_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2870 (class 2606 OID 16488)
-- Name: taskcomments comment_of_task; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taskcomments
    ADD CONSTRAINT comment_of_task FOREIGN KEY (task_id) REFERENCES public.tasks(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2864 (class 2606 OID 16493)
-- Name: notify creator_employee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notify
    ADD CONSTRAINT creator_employee FOREIGN KEY (create_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2871 (class 2606 OID 16498)
-- Name: tasks employee_assignee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT employee_assignee FOREIGN KEY (employee_assignee) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2872 (class 2606 OID 16503)
-- Name: tasks employee_creator; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT employee_creator FOREIGN KEY (employee_creator) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2862 (class 2606 OID 16508)
-- Name: employees employee_position; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employee_position FOREIGN KEY (position_id) REFERENCES public.positions(id);


--
-- TOC entry 2866 (class 2606 OID 16513)
-- Name: perofproject employee_project; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perofproject
    ADD CONSTRAINT employee_project FOREIGN KEY (employee_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2873 (class 2606 OID 16518)
-- Name: tasks of_project; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT of_project FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2867 (class 2606 OID 16523)
-- Name: perofproject project_constraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perofproject
    ADD CONSTRAINT project_constraint FOREIGN KEY (pro_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2865 (class 2606 OID 16528)
-- Name: notify receiver_employee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notify
    ADD CONSTRAINT receiver_employee FOREIGN KEY (receive_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2868 (class 2606 OID 16533)
-- Name: requests request_of; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT request_of FOREIGN KEY (employeeid) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2874 (class 2606 OID 16538)
-- Name: user_roles role_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT role_id FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2863 (class 2606 OID 16543)
-- Name: employees user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT user_id FOREIGN KEY (id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2875 (class 2606 OID 16548)
-- Name: user_roles user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2020-07-28 00:13:50 +07

--
-- PostgreSQL database dump complete
--

