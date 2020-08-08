--
-- PostgreSQL database dump
--

-- Dumped from database version 10.11
-- Dumped by pg_dump version 11.6 (Ubuntu 11.6-1.pgdg18.04+1)

-- Started on 2020-08-08 12:03:53 +07

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

SET default_with_oids = false;

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
-- TOC entry 3019 (class 0 OID 0)
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
-- TOC entry 2999 (class 0 OID 16384)
-- Dependencies: 196
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees (id, created_at, updated_at, first_name, middle_name, last_name, id_number, id_created, id_location, address, position_id, bank_number, bank_name, bank_branch, birthday, start_time) FROM stdin;
15714589149401	1571458915080	\N	Huỳnh	Lê Hữu	Hưng	025699321	1354406400000	CA Hồ Chí Minh	Số 05 đường 3643A Phạm Thế Hiển, P7, Q8, Tp HCM	1	1234 5678 91011	BIDV	CN Quận 8	888105600000	1561939200000
15746072843063	1574607284409	1574607284409	Nguyễn	Văn	Trưởng Nhóm	090945612378	1574607174704	CA Tp Hồ Chí Minh	So 234 Nguyen Huu Tien	2	0909456123789	BIDV	CN Đông Sài Gòn	1574607174704	1574607174704
15782398324826	1578239832616	1578239832616	Pham	Ngoc	Dieu	098712347564	1453309200000	TP HCM	Quận 3	4	34253426435645	Pham Ngoc Dieu	Phu Lam	1578239749399	1578239749399
15782401353207	1578240135422	1578240135422	Nguyễn 	Thanh 	Tân	234235676786	1451926800000	Ca Mau	100 Võ Văn Ngân Thủ Đức	4	2134567542343	Thanh Tân	Đông Sài Gòn	883674000000	1578239988511
15782405203918	1578240520490	1578240520490	Phan Thị 	Thùy 	Dương	3247456435324	1465059600000	Vũng Tàu	3 Võ Văn Kiêt P5 Q5 Tp HCM	4	3245346345243	Thuy Duong	Bắc Sài Gòn	883933200000	1559667600000
15782407734329	1578240773533	1578240773533	Đặng 	Thị 	Duyên	21321432423	1451926800000	Bình Định	50 Bùi Viện Quận 1 TP HCM	4	12324234123	Dang Thi Duyen	Sai Gon	883933200000	1546966800000
15782708385800	1578270838676	1578270838676	Nguyễn 	Thị 	Phúc	4353634523454	1388941200000	An Giang	853 An Dương Vương P13 Q6 Tp HCM	4	235346453245	Phuc	Bắc Sài Gòn	820861200000	1578270700792
15950450062991	1595045006469	1595045006469	Nami	Bot	Test	24423536245626	1595044927800	TpHCM	Quận 6	4	123456	Nami	Phu Lam	1595044927800	1595044927800
15950503065742	1595050306728	1595050306728	Phan	Văn Phước	Thịnh	0122420234	1595049976507	Bến Tre	Quận Thủ Đức 	2	34534563	ACB	Thu Duc	1595049976507	1595049960000
15751881480165	1575188148423	1595914769847	Thai	Thanh 	Liem	123456789	1575188038182	tphcm quan 6 p13	Quận 6	2	123456789	saccombank	phu lam	1520064780000	1575188038182
\.


--
-- TOC entry 3000 (class 0 OID 16390)
-- Dependencies: 197
-- Data for Name: genuid; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genuid (id, index, count) FROM stdin;
1	2	12
2	6	256
3	9	79
\.


--
-- TOC entry 3001 (class 0 OID 16393)
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
15962590731095	15751881480165	Thai Thanh  Liem	1596259072869	Work from hone	15782407734329	f
15962590730964	15751881480165	Thai Thanh  Liem	1596259072869	Work from hone	15782405203918	f
15962590731476	15751881480165	Thai Thanh  Liem	1596259072869	Work from hone	15714589149401	f
15962590731617	15751881480165	Thai Thanh  Liem	1596259072869	Work from hone	15782398324826	f
15962590731758	15751881480165	Thai Thanh  Liem	1596259072869	Work from hone	15746074348584	f
15962590731929	15751881480165	Thai Thanh  Liem	1596259072869	Work from hone	15950450062991	f
15962590731990	15751881480165	Thai Thanh  Liem	1596259072869	Work from hone	15782401353207	f
15962590732151	15751881480165	Thai Thanh  Liem	1596259072869	Work from hone	15746072843063	f
15962590732222	15751881480165	Thai Thanh  Liem	1596259072869	Work from hone	15950503065742	f
15962590732583	15751881480165	Thai Thanh  Liem	1596259072869	Work from hone	15782708385800	f
15962590920306	15751881480165	Thai Thanh  Liem	1596259091960	Work from home	15746074348584	f
15962590920245	15751881480165	Thai Thanh  Liem	1596259091960	Work from home	15782405203918	f
15962590920728	15751881480165	Thai Thanh  Liem	1596259091960	Work from home	15782407734329	f
15962590920667	15751881480165	Thai Thanh  Liem	1596259091960	Work from home	15782401353207	f
15962590920869	15751881480165	Thai Thanh  Liem	1596259091960	Work from home	15746072843063	f
15962590921361	15751881480165	Thai Thanh  Liem	1596259091960	Work from home	15751881480165	f
15962590921270	15751881480165	Thai Thanh  Liem	1596259091960	Work from home	15782398324826	f
15962590921602	15751881480165	Thai Thanh  Liem	1596259091960	Work from home	15950450062991	f
15962590921843	15751881480165	Thai Thanh  Liem	1596259091960	Work from home	15782708385800	f
15962590921874	15751881480165	Thai Thanh  Liem	1596259091960	Work from home	15714589149401	f
15962590922015	15751881480165	Thai Thanh  Liem	1596259091960	Work from home	15950503065742	f
\.


--
-- TOC entry 3002 (class 0 OID 16399)
-- Dependencies: 199
-- Data for Name: perofproject; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.perofproject (pro_id, employee_id, role) FROM stdin;
15776774274194	15714589149401	0
15782413529787	15751881480165	0
15782413529787	15782401353207	2
15776774274194	15782398324826	2
15776774274194	15782401353207	2
15782413529787	15782407734329	2
15776774274194	15751881480165	1
15938430081286	15751881480165	0
15938430081286	15746072843063	2
15938430081286	15714589149401	2
15938430081286	15782398324826	2
15776774274194	15950450062991	2
15938430081286	15950503065742	1
15962569371845	15751881480165	0
15962569371845	15782401353207	1
15962569371845	15950503065742	2
15962569371845	15782405203918	2
15962569371845	15782398324826	2
15782413529787	15746072843063	1
15782413529787	15950503065742	2
15962743996095	15751881480165	0
15962743996095	15782398324826	1
15962743996095	15782405203918	2
15962743996095	15950503065742	2
15962743996095	15782708385800	2
15962755226243	15751881480165	0
15962755226243	15950450062991	1
15962755226243	15782708385800	2
15962755226243	15950503065742	2
15962755226243	15782407734329	2
15968610726527	15751881480165	0
15968610726527	15746072843063	1
15968610726527	15782407734329	2
15968610726527	15782708385800	2
\.


--
-- TOC entry 3003 (class 0 OID 16402)
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
-- TOC entry 3004 (class 0 OID 16405)
-- Dependencies: 201
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, title, description, state, created_at, updated_at) FROM stdin;
15776774274194	Website thương mại điện tử	Xây dựng website thương mại điện tử với Reactjs	0	1577677427419	1577677427419
15782413529787	Website bán quần áo	Bán quần áo chuyên về đồ nam	0	1578241352980	1578241352980
15938430081286	Gantt Project	Test gantt char để tính đường găng	0	1593843008133	1593843008133
15962569371845	Ứng dụng quảng cáo	Ngày nhận : 1/8/2020\nNgày hoàn thành : 12/9/2020	0	1596256937186	1596256937186
15962743996095	Website bán nội thất văn phòng	Có phần chat bot, có đặt hàng . 	0	1596274399614	1596274399614
15962755226243	Ứng dụng điểm danh cho công ty Thuận Phát	Điểm danh theo vị trí, vân tay , khuôn mặt	0	1596275522624	1596275522624
15968610726527	Test Delete Project	Liem	0	1596861072653	1596861072653
\.


--
-- TOC entry 3005 (class 0 OID 16411)
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
15962592342056	15751881480165	Thai Thanh  Liem	Team Leader	1597209540000	1597382340000	Go to hospital	t
\.


--
-- TOC entry 3006 (class 0 OID 16417)
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
-- TOC entry 3007 (class 0 OID 16423)
-- Dependencies: 204
-- Data for Name: taskcomments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.taskcomments (id, task_id, employee_id, comment, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3008 (class 0 OID 16429)
-- Dependencies: 205
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (id, project_id, title, started_at, duration, state, point, employee_creator, description, created_at, updated_at, employee_assignee, pre_task_id) FROM stdin;
15782700612879	15782413529787	Chức năng quản lý sản phẩm	1580084220000	5	5	5	15751881480165	Thực hiện bằng reactjs tren web , react native trên moblie	1578270061329	1578273286299	15782407734329	\N
15782701408610	15782413529787	Dựng server trên aws	1580084460000	2	5	4	15751881480165	Chạy trên nền Ubuntu , Docker 	1578270140862	1578288761547	15782401353207	\N
15782697714607	15782413529787	Chức năng thanh toán	1578874440000	5	5	4	15751881480165	Cần cho thanh toán qua thẻ của tất cả ngân hàng	1578269771461	1578270598534	15751881480165	\N
15782695562435	15782413529787	Chức năng đăng nhập	1578874260000	3	2	5	15751881480165	Có gg authentica	1578269556244	1578274184074	15782401353207	\N
15782416909167	15782413529787	Mô tả DB	1578846360000	4	3	5	15751881480165	Nêu ra rõ các bảng và mối quan hệ	1578241690916	1578275764929	15751881480165	\N
15782888628711	15782413529787	xây dựng host	1580362320000	1	0	0	15751881480165	OS : Ubuntu	1578288862873	1592673121237	15751881480165	\N
15782698474708	15782413529787	Thiết kế giao diện 	1579194000000	6	5	4	15751881480165	Sử dung biểu mẫu và use-case để thực hiện	1578269847470	1592898324925	15782407734329	\N
15782704812173	15782413529787	Chức năng thống kê	1579825620000	4	0	0	15751881480165	Theo sản phẩm, theo giá bán , doanh thu	1578270481217	1592721110810	15782407734329	\N
15938442563865	15938430081286	I	1595350800000	6	1	0	15751881480165	i	1593844256389	1596251528115	15950503065742	15938441785793,15938442116384
15782414591315	15782413529787	Mô tả use-case	1578241354076	3	0	0	15751881480165	Chi tiết cho từng chức năng 	1578241459166	1596270850436	15746072843063	\N
15782704253822	15782413529787	Chức năng search 123	1579134180000	7	0	0	15751881480165	Tìm kiếm tất cả sản phẩm	1578270425382	1596270884705	15950503065742	\N
15782696929356	15782413529787	Chức năng xem sản phẩm	1578960720000	3	1	5	15751881480165	Có thể chọn các loại, theo giá, theo màu	1578269692936	1596270859053	15950503065742	\N
15782415862616	15782413529787	Thiết kế biểu mẫu	1578241495510	6	3	5	15751881480165	Xây dựng rõ ràng chi tiết cho từng form	1578241586261	1596270871749	15746072843063	
15962574679356	15962569371845	Thu thập thông tin 	1596257040000	5	1	0	15751881480165	Cần quảng cáo những sản phẩm gì ?\nLập danh sách user story 	1596257467943	1596260991420	15782405203918	
15962748736750	15962743996095	[BE] : Xây dựng phần admin	1597743600000	5	0	0	15751881480165	Dựa theo user story 	1596274873681	1596274873681	15751881480165	15962745138826,15962747980789
15962746583478	15962743996095	[FE] :Lập trình giao diện 	1597052160000	7	1	0	15751881480165	Nhận biểu mẫu từ Design 	1596274658352	1596274905552	15782398324826	15962745939857
15962747980789	15962743996095	[BE] : Xây dựng trang người dùng	1597311420000	5	1	0	15751881480165	Dựa theo yêu cầu của user story	1596274798079	1596274912921	15950503065742	15962745138826
15962750136951	15962743996095	[OS] : Xây môi trường thử nghiệm	1598089260000	2	0	0	15751881480165	Chỉ sử dụng nội bộ	1596275013695	1596275013695	15751881480165	15962747980789,15962746583478
15962750935852	15962743996095	[FE] : Xây dựng trang admin	1597398180000	5	0	0	15751881480165	Dựa vào thiết kế của design	1596275093588	1596275093588	15782405203918	15962747980789,15962745939857
15962745939857	15962743996095	[DS] : Thiết kế giao diện	1596706500000	4	1	0	15751881480165	Phân tích chức năng và thiết kế giao diện	1596274593985	1596275102673	15782708385800	15962745138826
15962745138826	15962743996095	Thu thập thông tin 	1596274400373	5	2	0	15751881480165	Liệt kê chi tiết các chức năng	1596274513883	1596275110383	15782405203918	
15782718038678	15776774274194	Thiết kế CSDL	1575852540000	3	5	5	15714589149401	Bằng postgress	1578271803868	1596275213109	15782398324826	15782717407117
15914257228033	15776774274194	Chọn Công Nghệ	1591425672732	3	5	4	15714589149401	Vd: Java, React	1591425722804	1596275225522	15782401353207	15782718038678
15782702328641	15782413529787	Dựng dbservice 	1579194000000	4	1	0	15751881480165	Control giữa database và app	1578270232864	1596692549883	15782401353207	\N
15938437931602	15938430081286	F	1595178000000	1	5	5	15751881480165	f	1593843793161	1596275358438	15782398324826	15938433832359
15782717407117	15776774274194	Thiết kế biểu mẫu	1575219600000	4	5	5	15714589149401	Chỉ tiết các form có thể xuất hiện 	1578271740711	1596275614704	15714589149401	15782716755476
15927312769983	15776774274194	Dump database	1592731144985	4	5	5	15751881480165	Backup database	1592731276999	1596275622369	15714589149401	
15926292745059	15776774274194	Test chức năng update	1591722000000	2	5	5	15714589149401	Thực hiện update 1 task bất kì	1592629274506	1596275629180	15782398324826	15914257228033
15926383699530	15776774274194	Test load card task	1592638089462	2	5	4	15714589149401	12 34 	1592638369954	1596275636032	15782398324826	
15782716755476	15776774274194	Thu thập thông tin 	1574960400000	2	5	3	15714589149401	Tìm kiểm đánh giá sản phẩm sắp thực hiện 	1578271675548	1596275643273	15782401353207	
15926384053251	15776774274194	Test load card 2	1592638369986	4	5	5	15714589149401	123123123123	1592638405325	1596275650458	15751881480165	
15950489514897	15776774274194	Thiết kế giao diện app	1595048896031	5	5	1	15751881480165	Thiết kế giao diện app	1595048951490	1596275659469	15950450062991	
15961307641452	15938430081286	M	1596646800000	2	0	0	15714589149401	Test web hook	1596130764146	1596552690923	15714589149401	15961305727621
15961308733963	15938430081286	N	1596646800000	2	2	0	15714589149401	Test web hook	1596130873396	1596386230131	15950503065742	15961305727621
15938442951536	15938430081286	K	1595869200000	11	2	0	15751881480165	k	1593844295155	1596551214884	15751881480165	15938437931602,15938442563865
15961301714750	15938430081286	J	1596130112251	2	1	\N	15714589149401	Test webhook	1596130171481	1596552972840	15782398324826	15938442563865
15938433832359	15938430081286	C	1594141200000	4	5	5	15751881480165	c	1593843383235	1596681210616	15746072843063	15938432611527
15938434965090	15938430081286	D	1594486800000	2	5	3	15751881480165	D	1593843496510	1596681222876	15751881480165	15938432611527
15938432611527	15938430081286	A	1593795600000	4	2	\N	15751881480165	a	1593843261154	1596681332990	15746072843063	
15938433333068	15938430081286	B	1593795600000	5	4	5	15751881480165	B	1593843333306	1596682143183	15950503065742	
15938441785793	15938430081286	H	1594832400000	6	1	0	15751881480165	h	1593844178580	1596682299999	15782398324826	15938433832359,15938434965090,15938435997321
15938442116384	15938430081286	G	1594746000000	2	3	0	15751881480165	g	1593844211644	1596682930405	15714589149401	15938433333068
15938435997321	15938430081286	E	1594141200000	8	3	0	15751881480165	e	1593843599732	1596682938886	15746072843063	15938432611527
15961305727621	15938430081286	K	1596301200000	4	5	5	15714589149401	Test web hook	1596130572763	1596692586059	15714589149401	15961301714750
15962608868162	15962569371845	[BE] : Xây dựng chức năng xem video quảng cáo 	1597424400000	11	0	0	15751881480165	Kết nối với database thông qua dbservice được tạo trước đó	1596260886816	1596859968389	15751881480165	15962581357969,15962579482528
15962579482528	15962569371845	Thiết kế cơ sở dữ liệu	1596733200000	3	1	0	15751881480165	Chọn cơ sở dữ liệu phù hợp với dự án	1596257948252	1596859991230	15782401353207	15962574679356
15962581357969	15962569371845	[BE] : Tạo database service	1597078800000	2	0	0	15751881480165	Ngôn ngữ : Java , Python\n	1596258135799	1596860009561	15751881480165	15962579482528
15962585012220	15962569371845	[DS] : Thiết kế biểu mẫu	1597165200000	12	0	0	15751881480165	Giao diện người dùng , giao diện admin 	1596258501223	1596860017230	15782401353207	15962578745537
15962578745537	15962569371845	Phân tích nghiệp vụ	1596646800000	6	1	0	15751881480165	Liệt kê chi tiết chức năng	1596257874554	1596860022421	15950503065742	15962574679356
15962609727673	15962569371845	[QC] : Kiểm thử phần mềm	1598374800000	4	0	0	15751881480165	Dựa trên user story , kiểm tra các chức năng 	1596260972767	1596860055303	15782405203918	15962608868162
15962603295421	15962569371845	[FE] : Lập trình giao diện	1598288400000	5	0	0	15751881480165	Dựa trên database và biểu mẫu	1596260329545	1596860072241	15782398324826	15962579482528,15962585012220
15968612223538	15968610726527	task 1	1596861134950	1	0	0	15751881480165	a	1596861222355	1596861222355	15782407734329	
\.


--
-- TOC entry 3009 (class 0 OID 16435)
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
-- TOC entry 3010 (class 0 OID 16438)
-- Dependencies: 207
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, phone, password, provider, provider_id, oauth2_name, image_url, email_verified, created_at, updated_at, status) FROM stdin;
15714589149401	huuhung9822@gmail.com	0938781162	$2a$10$uPjQ.ZhoRY1mqiWvSupRUOyXWM0yR7MoHix85oRk.Ls7BY/K8pXIq	google	107889025848008063650	Hưng Huỳnh	https://lh4.googleusercontent.com/-vao6VCfseGo/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reIFx6E9VfOMlCmZEleSK2kvEAJFg/photo.jpg	t	1571458915068	\N	1
15746072843063	test.lead.1@gmail.com	0909456123	$2a$10$QSzWFRz83r2eQnels2WUXuoKDc3EjiH/TPWqub95mTJQCXrSXslxa	local	\N	\N	\N	f	1574607284406	1574785905109	1
15746071512232	test.staff.1@gmail.com	0909123456	$2a$10$TX/fSfJQuSENRFVu5GJkyO7LgWJMIzIyHt4mWDPtVfPqn1zOVX8wS	local	\N	\N	\N	f	1574607151398	1577676436907	2
15782398324826	dieu@gmail.com	0909457835	$2a$10$LH2l5uDfK4K.9ZK79xpae.ZarRYMKHic5oorXBfpPlbW7V5x3UC9a	local	\N	\N	\N	f	1578239832614	1578240857435	1
15782401353207	tan@gmail.com	0909435123	$2a$10$ohM5A5fD3jjS8Ed08H4H/uIN5hbp7YCFuEPIxo7S.2RCwwE5j3xfC	local	\N	\N	\N	f	1578240135421	1578240877542	1
15782405203918	duong@gmail.com	0909423765	$2a$10$C1HjXuxHaHo.eFaScMC3X.lt..n5j.B4GDdFXruNWu6Fr0WGKDBe6	local	\N	\N	\N	f	1578240520489	1578240897954	1
15782407734329	duyen@gmail.com	0984763751	$2a$10$q1eIeuwEE/af2t9Xjlj9ue17oC7uljSaA6ZubayE.2vivjLXIm.Ci	local	\N	\N	\N	f	1578240773532	1578240931382	1
15751881480165	thaithanhliem2704@gmail.com	0961375203	$2a$10$m9wfg.0ZBrIsjCVM9zBHKu3yO3X2Ti8RPNR787RvM9eWT/eFJOTHO	google	117054783354917662920	thai thanh liem	https://lh5.googleusercontent.com/--F14Dt13l_M/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn9c0-QXMxqWBk56a_ednh9DcsW3w/photo.jpg	t	1575188148420	1578149629377	1
15782708385800	phuc@gmail.com	098756351	$2a$10$R7FnMro/EmdxYBKxOR5AJeqQ2Od5.n919zFHQwr1aLFJXDZqknJuq	local	\N	\N	\N	f	1578270838675	1591425988342	1
15950450062991	nami@gmail.com	0961375204	$2a$10$/XQEncjZCyCrIZhvOcWED.F7uaEVegdNCQK5wYxNObjQfZR7d6WFi	local	\N	\N	\N	f	1595045006466	1595047139237	1
15950503065742	thinh@gmail.com	0909438004	$2a$10$sUafWz4PcDmE3zMU8xqqcuIC02OHnapr17Zr/4/QjTfoW/Gqu4iYy	local	\N	\N	\N	f	1595050306726	1595050525450	1
15746074348584	test.staff.2@gmail.com	0909654321	$2a$10$n39S1dPWhOjO.sz2Kzf85.VcyASAV1RbcqXD/o.O60sKGYElUO51m	local	\N	\N	\N	f	1574607434956	1596862612683	2
\.


--
-- TOC entry 3011 (class 0 OID 16444)
-- Dependencies: 208
-- Data for Name: webhook; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.webhook (id_webhook, id_project, bot_token, chat_id, create_task, update_task, update_state, name_webhook) FROM stdin;
15962516561244	15938430081286	bot1099509570:AAHOj7AgmU-zxaUEH3rwD_JCgqHect-scrk	-399446639	t	t	t	Gantt_Group
\.


--
-- TOC entry 3013 (class 0 OID 16452)
-- Dependencies: 210
-- Data for Name: wiki; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.wiki (wiki_id, wiki_title, project_id, created_by, path, content, state, created_at, updated_at) FROM stdin;
15928973481731	liem test wiki	\N	15751881480165	/		0	\N	\N
15928973702891	liem test wiki / 1	\N	15751881480165	/15928973481731/		0	\N	\N
15959146948241	SUM : up 3s	\N	15751881480165	/15928973481731/	<p>Test wiki</p>\n	0	\N	\N
\.


--
-- TOC entry 3020 (class 0 OID 0)
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
    ADD CONSTRAINT comment_of_employee FOREIGN KEY (employee_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


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
    ADD CONSTRAINT employee_assignee FOREIGN KEY (employee_assignee) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2872 (class 2606 OID 16503)
-- Name: tasks employee_creator; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT employee_creator FOREIGN KEY (employee_creator) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


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
    ADD CONSTRAINT of_project FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2867 (class 2606 OID 16523)
-- Name: perofproject project_constraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perofproject
    ADD CONSTRAINT project_constraint FOREIGN KEY (pro_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2876 (class 2606 OID 16528)
-- Name: webhook project_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.webhook
    ADD CONSTRAINT project_id FOREIGN KEY (id_project) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2877 (class 2606 OID 16533)
-- Name: wiki project_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wiki
    ADD CONSTRAINT project_id FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2865 (class 2606 OID 16538)
-- Name: notify receiver_employee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notify
    ADD CONSTRAINT receiver_employee FOREIGN KEY (receive_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2868 (class 2606 OID 16543)
-- Name: requests request_of; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT request_of FOREIGN KEY (employeeid) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2874 (class 2606 OID 16548)
-- Name: user_roles role_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT role_id FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2863 (class 2606 OID 16553)
-- Name: employees user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT user_id FOREIGN KEY (id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2875 (class 2606 OID 16558)
-- Name: user_roles user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2020-08-08 12:03:58 +07

--
-- PostgreSQL database dump complete
--

