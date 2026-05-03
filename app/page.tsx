import {
  ArrowUpRight,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Users,
  Wallet,
  Sparkles,
  Code2,
  Database,
  Cloud,
  Cpu,
  Layers,
  Globe,
  TrendingUp,
  HeartPulse,
  Briefcase,
  NotebookPen,
  BookMarked,
  Image as ImageIcon,
  Dumbbell,
  Lightbulb,
  Film,
  Sun,
  CalendarDays,
  Award,
  Trophy,
  Banknote,
  Hammer,
  Target,
  Brain,
  Rocket,
  Zap,
  Send,
  ExternalLink,
  Compass,
  HandshakeIcon,
  MessagesSquare,
  Quote,
  Check,
  CircleCheckBig,
  PartyPopper,
} from "lucide-react";
import Link from "next/link";
import { getNextBootcampWeekend } from "@/lib/landing-dates";

// 1시간마다 ISR 재생성 — KST 자정 넘어가면 다음 토일로 자동 갱신
export const revalidate = 3600;

export default function Page() {
  const { saturday, sunday } = getNextBootcampWeekend();
  const dateRange = `${saturday.month}월 ${saturday.day}일(토) · ${sunday.day}일(일)`;
  const dateShort = `${saturday.month}월 ${saturday.day}일 · ${sunday.day}일`;
  const dateSlash = `${saturday.month}/${saturday.day} 토 · ${sunday.month}/${sunday.day} 일`;
  const day1Date = `${saturday.month}/${saturday.day} (토)`;
  const day2Date = `${sunday.month}/${sunday.day} (일)`;
  const datePunch = `${saturday.month}월 ${saturday.day} · ${sunday.day}일`;
  return (
    <main className="overflow-x-hidden bg-bg">
      {/* ────────  announcement  ──────── */}
      <div className="bg-fg text-white">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8 py-2.5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[12.5px] sm:text-[13px] font-medium">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-orange-soft" />
            <span>{dateRange} · 14:00–17:00</span>
          </span>
          <span className="hidden sm:inline text-fg-3">·</span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-orange-soft" />
            서울대입구역
          </span>
          <span className="hidden sm:inline text-fg-3">·</span>
          <span className="inline-flex items-center gap-1.5 text-orange-soft font-semibold">
            <Users className="h-3.5 w-3.5" />
            5명 한정 프라이빗 베타
          </span>
        </div>
      </div>

      {/* ────────  nav  ──────── */}
      <nav className="sticky top-0 z-50 bg-bg/85 backdrop-blur-md border-b border-line">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8 flex items-center justify-between h-[68px]">
          <a href="#top" className="flex items-center gap-2.5 group">
            <span className="grid place-items-center h-8 w-8 rounded-2xl bg-orange text-white font-bold text-[14px] tracking-[-0.05em] shadow-[0_4px_10px_rgba(255,111,15,0.35)]">
              해
            </span>
            <span className="h-display text-[20px] tracking-[-0.04em]">haejo</span>
            <span className="hidden sm:inline-flex items-center text-[13px] text-muted ml-1.5 pl-2.5 border-l border-line">
              by 변상훈
            </span>
          </a>
          <div className="hidden md:flex items-center gap-7 text-[14.5px]">
            <a href="#build" className="nav-link">만들 것</a>
            <Link href="/demo" className="nav-link inline-flex items-center gap-1">
              결과물 미리 보기
              <ArrowUpRight className="h-3 w-3 text-orange" />
            </Link>
            <a href="#curriculum" className="nav-link">커리큘럼</a>
            <a href="#instructor" className="nav-link">강사</a>
            <a href="#community" className="nav-link">커뮤니티</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </div>
          <a
            href="#join"
            className="group inline-flex items-center gap-1.5 rounded-full bg-orange hover:bg-[#e25d04] text-white px-5 py-2.5 text-[13.5px] font-semibold transition-[background,transform] hover:-translate-y-px shadow-[0_4px_12px_rgba(255,111,15,0.32)]"
          >
            신청하기
            <ArrowRight className="arr-chev h-3.5 w-3.5" />
          </a>
        </div>
      </nav>

      {/* ────────  hero  ──────── */}
      <header id="top" className="relative bg-bg pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-28 overflow-hidden">
        {/* soft circles */}
        <div className="pointer-events-none absolute -top-24 -right-32 w-[520px] h-[520px] rounded-full bg-peach blur-3xl opacity-70" />
        <div className="pointer-events-none absolute top-72 -left-40 w-[380px] h-[380px] rounded-full bg-mint blur-3xl opacity-50" />

        <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <div className="reveal inline-flex items-center gap-2.5">
              <span className="tag-pill">
                <Sparkles className="h-3.5 w-3.5" />
                5명 한정 프라이빗 베타
              </span>
              <span className="text-[13px] text-muted font-mono tracking-wide">30,000원</span>
            </div>

            <h1 className="reveal delay-1 h-display-tight mt-6 text-[44px] sm:text-[58px] lg:text-[72px] xl:text-[80px]">
              내 아이디어를
              <br />
              <span className="hl-orange">‘돈 되는 AI 서비스’</span>로
              <br />
              직접 만드는 <span className="text-orange">2일.</span>
            </h1>

            <p className="reveal delay-2 mt-7 max-w-[560px] text-[16px] sm:text-[17.5px] leading-[1.7] text-fg-2">
              예전엔 아이디어 하나를 웹 서비스로 만들려면 수백만 원과 반년이 필요했어요.
              지금은 단 이틀이면, <span className="font-semibold text-fg">코드 한 줄 못 써도</span> 여러분의 아이디어를 실제 인터넷에 띄울 수 있습니다.
              공간 대여비와 노쇼 방지용 책임비 <span className="font-semibold text-fg">3만 원</span>만 받고, 실전 노하우를 전부 공개해요.
            </p>

            <div className="reveal delay-3 mt-9 flex flex-wrap gap-3">
              <a href="#join" className="btn-orange group">
                부트캠프 신청하기
                <ArrowRight className="arr-chev h-4 w-4" />
              </a>
              <a href="#curriculum" className="btn-ghost-light group">
                커리큘럼 보기
                <ArrowUpRight className="arr-chev h-4 w-4" />
              </a>
            </div>

            {/* mini meta strip */}
            <div className="reveal delay-4 mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px] text-fg-3">
              <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-orange" /> 코드 한 줄 안 외워도 OK</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-orange" /> 노트북 한 대만 있으면 됨</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-orange" /> Claude Code Pro($20) 또는 GPT Go($4.99) 중 택1</span>
            </div>
          </div>

          {/* hero card visual */}
          <div className="reveal delay-2 relative">
            <div className="relative card-soft p-7 sm:p-8 rounded-[28px]">
              <span className="tag-pill mb-5">
                <PartyPopper className="h-3.5 w-3.5" />
                {dateShort} 모집 중
              </span>
              <div className="grid grid-cols-2 gap-3.5">
                <HeroCell icon={<CalendarDays />} k="DATE" v={dateSlash} sub="2일 완성 부트캠프" />
                <HeroCell icon={<Clock />} k="TIME" v="14:00 — 17:00" sub="각 차시 60분" />
                <HeroCell icon={<MapPin />} k="PLACE" v="서울대입구역" sub="오프라인 모임" />
                <HeroCell icon={<Wallet />} k="PRICE" v="30,000원" sub="공간비 + 책임비" tone="orange" />
              </div>
              <div className="mt-4 rounded-2xl bg-cream border border-orange-tint p-4 flex items-center gap-3">
                <span className="num-circle h-10 w-10 text-[14px]">5</span>
                <div className="flex-1">
                  <div className="h-medium text-[15px]">선착순 5명만 모십니다</div>
                  <div className="text-[12.5px] text-fg-3 mt-0.5">강사가 한 명 한 명 직접 봐드려요</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-4 sm:-left-7 rotate-[-3deg] hidden sm:block">
              <div className="rounded-2xl bg-fg text-white px-4 py-2.5 shadow-soft-lg flex items-center gap-2 text-[13px] font-semibold">
                <Sparkles className="h-3.5 w-3.5 text-orange-soft" />
                AI가 코드를 만들고, 우리는 잘 시키기만!
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ────────  for whom  ──────── */}
      <section id="for" className="bg-cream py-24 sm:py-32">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <SectionHead
            kicker="이런 분께 추천해요"
            title={
              <>
                ‘내 아이디어, 직접
                <br className="hidden sm:block" />{" "}
                만들어 보고 싶다’<span className="text-orange">는 분.</span>
              </>
            }
            sub="코딩은 제가 아니라 AI가 합니다. 셋 중 하나라도 본인 얘기 같다면 충분히 따라올 수 있도록 설계됐어요."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mt-10 sm:mt-14">
            <ForWhomCard
              num="01"
              tone="orange"
              role="Beginner"
              icon={<Compass />}
              title={<>코딩은 처음이지만<br />컴퓨터는 쓸 줄 압니다</>}
              desc="파일 만들기 · 폴더 열기 정도면 충분해요. 모든 코드는 AI가 만들어 주고, 우리는 한국어로 잘 시키는 법을 배웁니다."
            />
            <ForWhomCard
              num="02"
              tone="green"
              role="Worker"
              icon={<Briefcase />}
              title={<>업무 자동화가 늘<br />머릿속에 있는 직장인</>}
              desc="거래처 이메일 · 블로그 초안 · 반복 보고서. 매일 손으로 하던 일을 AI가 대신하게 만드는 첫 사이드 프로젝트."
            />
            <ForWhomCard
              num="03"
              tone="dark"
              role="Builder"
              icon={<Hammer />}
              title={<>예비 창업자, 1인 빌더<br />혹은 부업러</>}
              desc="아이디어는 있지만 만들 사람이 없었던 분. 같은 뼈대로 본인 서비스에 변형해 인터넷에 띄우는 첫 한 사이클을 통과합니다."
            />
          </div>
        </div>
      </section>

      {/* ────────  what you'll build  ──────── */}
      <section id="build" className="bg-bg py-24 sm:py-32">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <SectionHead
            kicker="만들 것"
            title={
              <>
                장난감이 아니라,
                <br />
                <span className="text-orange">당장 써먹을 수 있는</span> 서비스.
              </>
            }
            sub="아래 세 가지 중 하나를 골라 직접 만들어 보세요. 같은 뼈대로 일기 · 독서록 · 식단 · 운동 · 하루 회고 등 10가지 이상으로 변형 가능합니다."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mt-12">
            <FeatCard
              accent="peach"
              icon={<TrendingUp />}
              label="재테크 · 투자"
              title={<>주식 · 코인<br /><span className="text-orange">뉴스 요약 봇</span></>}
              desc="매일 아침 쏟아지는 경제 뉴스와 호재 · 악재를 AI가 세 줄로 자동 요약해 주는 나만의 투자 비서."
            />
            <FeatCard
              accent="mint"
              icon={<HeartPulse />}
              label="건강 · 자기관리"
              title={<>AI<br /><span className="text-orange">다이어트 코치</span></>}
              desc="오늘 먹은 식단을 적으면 AI가 칼로리를 계산하고, 내일 식단을 추천해 주는 맞춤형 일지."
            />
            <FeatCard
              accent="dark"
              icon={<Briefcase />}
              label="업무 · 부업"
              title={<>맞춤형<br /><span className="text-orange-soft">업무 자동화 툴</span></>}
              desc="거래처에 보낼 껄끄러운 이메일이나 블로그 포스팅 초안을 자동으로 생성해 주는 나만의 무기."
            />
          </div>

          <div className="mt-12 sm:mt-16 card-soft rounded-[28px] overflow-hidden">
            <div className="px-6 sm:px-8 py-5 bg-cream border-b border-line flex items-center gap-2.5">
              <Layers className="h-4 w-4 text-orange" />
              <span className="h-medium text-[14.5px]">같은 뼈대로 만들 수 있는 서비스 10가지+</span>
            </div>
            <div className="divide-y divide-line">
              {ideaRows.map((row) => (
                <IdeaRow key={row.idx} {...row} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────  demo entry — links to /demo  ──────── */}
      <section id="demo" className="bg-cream py-24 sm:py-32">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <div className="reveal inline-flex items-center gap-2.5 mb-6">
            <span className="tag-pill">
              <Sparkles className="h-3.5 w-3.5" />
              LIVE DEMO · 결과물 미리 보기
            </span>
          </div>
          <h2 className="h-display text-[40px] sm:text-[52px] tracking-[-0.045em] mb-3 leading-[1.05]">
            강의에서 만든 것을
            <br />
            <span className="text-orange">지금 바로 써보세요.</span>
          </h2>
          <p className="font-mono text-[13px] text-fg-3 mb-12">
            Built with this Course
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 sm:gap-8 items-stretch">
            {/* 좌: dark mini preview (정적 stub) */}
            <div className="card-data p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div>
                <div className="text-[11px] font-mono text-muted-2 uppercase tracking-wider mb-4">
                  오늘의 마켓 (예시)
                </div>
                <div className="grid grid-cols-3 gap-3 sm:gap-5">
                  {[
                    { label: "KOSPI", price: "2,567", delta: "+0.8%", up: true },
                    { label: "AAPL",  price: "192.4", delta: "+1.2%", up: true },
                    { label: "BTC",   price: "64,210", delta: "-0.4%", up: false },
                  ].map((s) => (
                    <div key={s.label} className="flex flex-col gap-1">
                      <div className="font-mono text-[11px] text-muted-2">{s.label}</div>
                      <div className="font-mono text-base sm:text-lg text-white">{s.price}</div>
                      <div className={`font-mono text-xs ${s.up ? "text-pos" : "text-neg"}`}>
                        {s.delta}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="text-[14px] leading-snug text-muted-2">
                  &ldquo;오늘은 반도체 호재가 시장을 끌어올린 하루입니다.&rdquo;
                </p>
                <div className="font-mono text-[11px] text-muted-2/60 mt-2">
                  — AI 요약 · 매일 07:00 KST 자동 갱신
                </div>
              </div>
            </div>

            {/* 우: 설명 + CTA */}
            <div className="card-soft p-6 sm:p-8 flex flex-col gap-6">
              <div>
                <div className="h-card text-[22px] mb-2">AI-Market-Curator</div>
                <p className="text-fg-2 text-[15px] leading-relaxed">
                  매일 아침 7시, 관심 종목과 키워드 뉴스를 AI가 3줄로 요약해 드려요.
                  <br className="hidden sm:inline" />
                  <span className="text-fg-3">강의 2일 차에 함께 만드는 결과물입니다.</span>
                </p>
              </div>
              <div className="border-t border-line pt-5 mt-auto flex flex-col sm:flex-row gap-3">
                <Link href="/demo" className="btn-orange flex-1 justify-center group">
                  데모 열기
                  <ArrowUpRight className="arr-chev h-4 w-4" />
                </Link>
                <a href="#curriculum" className="btn-ghost-light flex-1 justify-center">
                  어떻게 만들었지?
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────  outcomes  ──────── */}
      <section id="outcomes" className="bg-peach py-24 sm:py-32">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <SectionHead
            kicker="강의가 끝나면"
            title={
              <>
                여러분 손에
                <br />
                <span className="text-orange">진짜로 남는 것.</span>
              </>
            }
            sub="막연한 이해가 아니라, 직접 만든 결과물과 다음 아이디어로 옮겨 갈 수 있는 패턴이 남습니다."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
            <Outcome icon={<Globe />}     title="인터넷에 공개된 내 서비스 URL" desc="친구에게 카톡으로 보낼 수 있는, 진짜 동작하는 웹사이트 한 개." />
            <Outcome icon={<Brain />}     title="AI에게 일을 시키는 감각"          desc="‘이런 화면을, 이런 식으로 바꿔줘’를 한국어로 자연스럽게 요청하는 능력." />
            <Outcome icon={<Layers />}    title="회원가입 · DB · AI 한 사이클"     desc="현대 AI 서비스의 표준 풀스택. 한 번 통과하면 다음엔 혼자 갈 수 있어요." />
            <Outcome icon={<Zap />}       title="에러를 두려워하지 않는 자세"     desc="‘빨간 메시지 → 복사 → AI에 붙여넣기 → 해결’ — 강의 90%를 관통하는 패턴." />
            <Outcome icon={<Lightbulb />} title="본인 아이디어 1개의 초안"        desc="같은 뼈대를 일기 · 독서록 · 식단 · 운동 등 본인 도메인으로 즉시 변형하는 법." />
            <Outcome icon={<NotebookPen />} title="강의 후에도 남는 워크북"        desc="차시별 따라하기 가이드 · 막힐 때 에러 패턴 · 응용 변형 만능 프롬프트." />
          </div>
        </div>
      </section>

      {/* ────────  curriculum  ──────── */}
      <section id="curriculum" className="bg-bg py-24 sm:py-32">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <SectionHead
            kicker="커리큘럼"
            title={
              <>
                2일,
                <br />
                인터넷에 띄우는 <span className="text-orange">한 사이클.</span>
              </>
            }
            sub="Day 1은 환경과 첫 화면, Day 2는 데이터 · AI · 배포. 각 차시 60분 — 도입 10분 / 실습 35–40분 / Q&A 10–15분."
          />

          {/* DAY 01 */}
          <div className="mt-14">
            <div className="flex items-center gap-3 mb-7">
              <span className="tag-pill">
                <Calendar className="h-3.5 w-3.5" />
                DAY 01 · {day1Date} 14:00
              </span>
            </div>
            <h3 className="h-display text-[26px] sm:text-[34px] lg:text-[40px]">
              머릿속 그림을 <span className="text-orange">PC 위로</span> 옮긴다.
            </h3>

            <div className="mt-7 grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Lesson
                num="01"
                title="오리엔테이션 — AI로 서비스 만든다는 것"
                desc="5개 도구의 역할을 한 줄 비유로 정리하고, 6차시 로드맵을 머릿속에 새깁니다. 이 강의의 핵심: 코드를 외우는 게 아니다."
                chips={["큰 그림", "5개 도구", "로드맵"]}
                outcome="강의 흐름 + 도구 5개의 역할 이해"
              />
              <Lesson
                num="02"
                title="환경 준비 + Claude Code 설치 (Mac · Windows)"
                desc="VS Code · Node.js · Git · GitHub · Claude Code Desktop을 차례로 설치합니다. 터미널(Mac) 또는 PowerShell(Windows)에 명령어를 직접 쳐 보고, 첫 파일을 AI가 만들어 줘요."
                chips={["VS Code", "Node.js", "Git", "Claude Code"]}
                outcome="모든 도구 설치 완료 + 첫 GitHub 푸시"
              />
              <Lesson
                num="03"
                title="Claude Code와 첫 프로젝트"
                desc="Next.js 프로젝트를 한국어 명령으로 생성하고 localhost:3000에 띄웁니다. 첫 화면을 본인 서비스로 바꾸는 요청까지."
                chips={["Next.js + TS", "Tailwind", "localhost:3000"]}
                outcome="내 PC에서 동작하는 첫 화면"
              />
            </div>
          </div>

          {/* DAY 02 */}
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-7">
              <span className="tag-pill green">
                <Calendar className="h-3.5 w-3.5" />
                DAY 02 · {day2Date} 14:00
              </span>
            </div>
            <h3 className="h-display text-[26px] sm:text-[34px] lg:text-[40px]">
              동작하는 사이트를 <span className="text-orange">진짜 서비스로.</span>
            </h3>

            <div className="mt-7 grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Lesson
                num="04"
                title="Supabase로 회원가입 + 데이터 저장"
                desc="Supabase 프로젝트와 테이블을 만들고, RLS 정책으로 본인 데이터만 보이게 합니다. 회원가입 · 로그인 · CRUD를 한 번에."
                chips={["Supabase", "Auth", "RLS", "CRUD"]}
                outcome="로그인 가능한 내 서비스"
              />
              <Lesson
                num="05"
                title="Gemini API로 AI 기능 추가"
                desc="무료 Gemini API 키를 발급받아 API 라우트를 만들고, 카드의 AI 버튼으로 호출합니다. 요약 · 생성 · 번역 등 본인 서비스에 맞게."
                chips={["Gemini", "API Route", "프롬프트"]}
                outcome="AI가 동작하는 내 서비스"
              />
              <Lesson
                num="06"
                title="Vercel로 인터넷에 공개"
                desc="GitHub와 Vercel을 연결하고 환경 변수를 등록해 배포. 코드 한 줄을 바꾸면 자동 재배포되는 흐름까지 체험합니다."
                chips={["Vercel", "환경 변수", "Auto Deploy"]}
                outcome="전 세계가 접속 가능한 내 URL"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ────────  stack  ──────── */}
      <section id="stack" className="bg-cream py-24 sm:py-32">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <SectionHead
            kicker="우리가 쓸 도구"
            title={
              <>
                Modern AI 서비스의
                <br />
                <span className="text-orange">표준 5종 세트.</span>
              </>
            }
            sub="실리콘밸리 스타트업이 실제로 쓰는 조합을 가장 단순한 형태로 한 번 통과합니다. Supabase · Gemini · Vercel · GitHub은 무료 한도, AI 코딩 도구는 Claude Code Pro($20/mo) 또는 GPT Go($4.99/mo) 중 하나면 됩니다."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mt-12">
            <Tool tone="orange" icon={<Cpu />}      meta="AI Coding"          name="Claude Code · GPT" desc="옆에 앉은 신입 개발자. 한국어로 시키면 코드를 만들어 줍니다. (Claude Code Pro $20 또는 GPT Go $4.99 중 하나 권장)" />
            <Tool tone="peach"  icon={<Code2 />}    meta="Web Framework"      name="Next.js"     desc="웹사이트의 표준 골격. 조립식 주택 키트로 비유합니다." />
            <Tool tone="green"  icon={<Database />} meta="Database · Auth"    name="Supabase"    desc="무료 자동 창고 + 경비실. 회원가입과 데이터 저장이 한 번에." />
            <Tool tone="orange" icon={<Sparkles />} meta="AI Model"           name="Gemini API"  desc="외부에서 도와주는 AI. 한국어 잘하고 무료 티어가 넉넉합니다." />
            <Tool tone="dark"   icon={<Cloud />}    meta="Deployment"         name="Vercel"      desc="인터넷에 가게를 차려 주는 매니저. GitHub 연결만 하면 끝." />
          </div>
        </div>
      </section>

      {/* ────────  instructor  ──────── */}
      <section id="instructor" className="bg-bg py-24 sm:py-32">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <SectionHead
            kicker="강사 소개"
            title={<>강사. <span className="text-orange">변상훈.</span></>}
            sub="현재 AI 서비스 팀에서 개발 · AI 아키텍트로 활동 중인 개발자"
          />

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-stretch">
            <div className="card-soft rounded-[28px] p-7 sm:p-10 flex flex-col order-2 lg:order-1">
              <Quote className="h-8 w-8 text-orange" />
              <p className="h-display text-[22px] sm:text-[28px] leading-[1.35] mt-4 text-balance">
                비개발자도 AI 한 번 통과시켜 보면, 다음 아이디어는 혼자 갈 수 있어요.
              </p>
              <p className="text-[15px] leading-[1.7] text-fg-2 mt-6 max-w-[540px]">
                곧 기업 · 직장인 대상으로 런칭할{" "}
                <span className="font-semibold text-fg">‘비개발자를 위한 AI 실전 부트캠프’</span>에 앞서, 우리 동네에서 딱 다섯 분만 모시고 프라이빗 베타 테스트를 진행합니다.
              </p>
              <p className="text-[15px] leading-[1.7] text-fg-2 mt-3 max-w-[540px]">
                공간 대여비와 최소한의 노쇼 방지용 책임비 <span className="font-semibold text-fg">‘3만 원’</span>만 받고, 실전 노하우를 전부 공개해요.
              </p>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Cred icon={<Trophy />}  k="국내 최대 AI 해커톤" v={<>1,226팀 중 <strong className="text-orange">전국 4위</strong></>} />
                <Cred icon={<Award />}   k="수상 이력"           v={<>과기정통부 <strong className="text-orange">장관상</strong></>} />
                <Cred icon={<Banknote />} k="현 직함"             v={<>AI <strong className="text-orange">정부지원 사업</strong> PM</>} />
              </div>
            </div>

            <div className="ph-block relative aspect-[4/5] lg:aspect-auto rounded-[28px] overflow-hidden text-white order-1 lg:order-2 min-h-[420px] lg:min-h-0">
              {/* photo */}
              <img
                src="/instructor.png"
                alt="강사 변상훈"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* darken gradient at top + bottom for label legibility */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/55" />
              {/* warm orange glow accents on top of photo */}
              <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-orange/35 blur-3xl mix-blend-screen" />
              <div className="pointer-events-none absolute -top-12 -left-12 h-44 w-44 rounded-full bg-orange-soft/30 blur-3xl mix-blend-screen" />

              <span className="absolute left-6 top-6 text-[12px] font-mono tracking-wide uppercase text-white/85 backdrop-blur-sm bg-black/20 rounded-full px-2.5 py-1">
                Portrait · 변상훈
              </span>
              <div className="absolute left-6 right-6 bottom-6 flex items-end justify-between">
                <div>
                  <div className="h-display-tight text-[28px] sm:text-[34px] leading-tight">
                    변상훈<span className="text-orange-soft">.</span>
                  </div>
                  <div className="text-[12.5px] text-white/70 font-mono tracking-wide mt-1">
                    Instructor · AI Architect
                  </div>
                </div>
                <span className="text-[13px] text-orange-soft font-medium">
                  ~ Sanghoon Byun
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────  join  ──────── */}
      <section id="join" className="bg-cream py-24 sm:py-32">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-[32px] bg-fg text-white p-7 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16">
            {/* glow */}
            <div className="pointer-events-none absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full bg-orange blur-[80px] opacity-50" />

            <div className="relative">
              <span className="tag-pill mb-5">
                <Users className="h-3.5 w-3.5" />
                5명 한정 · 선착순 마감
              </span>

              <h2 className="h-display-tight text-[36px] sm:text-[48px] lg:text-[56px]">
                같이 만들어요.
                <br />
                <span className="text-orange-soft">혼자 가지</span> 마세요.
              </h2>

              <p className="text-[15.5px] leading-[1.7] text-white/70 max-w-[480px] mt-5 mb-7">
                혼자 따라하다 막히면 진도가 멈춥니다. 당근 동네 모임에서 진도 맞추고, 카카오 오픈채팅에서 막힐 때 바로 물어보세요. 강사 변상훈도 함께 들어와 있습니다.
              </p>

              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <JoinMeta icon={<Wallet />}  k="Price" v="30,000원" />
                <JoinMeta icon={<MapPin />}  k="Place" v="서울대입구역" />
                <JoinMeta icon={<Users />}   k="Seats" v="선착순 5명" />
              </div>

              <div className="mt-6 rounded-2xl bg-white/[0.06] border border-white/10 p-5">
                <span className="inline-flex items-center gap-2 text-[12px] tracking-wide uppercase font-mono text-orange-soft mb-2.5">
                  <Send className="h-3.5 w-3.5" />
                  신청 방법
                </span>
                <p className="m-0 text-[14px] leading-[1.7] text-white/85">
                  당근 채팅으로 <strong className="text-white font-semibold">‘부트캠프 신청합니다’</strong> 메시지와 함께,
                  <br />
                  평소 자동화하고 싶었던 업무나 만들고 싶은 서비스 아이디어를 한 줄 적어 보내 주세요.
                </p>
              </div>
            </div>

            <div className="relative flex flex-col gap-3 self-center">
              <Channel
                href="https://daangn.com/kr/share/community/ref/invite-group/92xPE8dxBJ"
                tag="당근"
                title="당근 동네 모임"
                sub="함께 진도 맞추고 오프라인까지 — 초대 링크"
                bg="orange"
              />
              <Channel
                href="https://open.kakao.com/o/pJJaDNsi"
                tag="카톡"
                title="카카오톡 오픈채팅"
                sub="실습 중 막힐 때 바로 질문하세요"
                bg="yellow"
              />
              <p className="m-0 mt-2 px-1 text-[12px] leading-[1.6] text-white/50">
                두 채널 모두 무료 · 비공개 그룹 · 강의 일정 · 자료 공유 · Q&amp;A가 이곳에서 이뤄집니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────  community  ──────── */}
      <section id="community" className="bg-bg py-24 sm:py-32">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <SectionHead
            kicker="강의 이후"
            title={<>단발성 강의로<br /><span className="text-orange">끝나지 않습니다.</span></>}
            sub="수료 후 뜻이 맞는 분들과 함께 ‘AI 실전 빌더’ 커뮤니티를 결성합니다. 배운 것을 바탕으로 나만의 앱을 고도화하고, 서로의 아이디어를 사이드 프로젝트나 창업으로 발전시키는 진짜 어른들의 성장 모임으로 이어 가요."
          />

          <div className="mt-12 relative overflow-hidden rounded-[32px] bg-mint p-7 sm:p-12 lg:p-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="pointer-events-none absolute -bottom-24 -left-24 w-[360px] h-[360px] rounded-full bg-orange-tint blur-3xl opacity-70" />

            <div className="relative">
              <span className="tag-pill green mb-4">
                <MessagesSquare className="h-3.5 w-3.5" />
                Community
              </span>
              <h3 className="h-display-tight text-[30px] sm:text-[40px] lg:text-[44px]">
                ‘이거해줘’
                <br />
                <span className="text-orange">AI 실전 빌더 모임.</span>
              </h3>
              <p className="text-[15.5px] leading-[1.7] text-fg-2 max-w-[460px] mt-5">
                수료생끼리 서로의 사이드 프로젝트를 리뷰하고, 막힌 부분을 같이 풀고, 작은 결과물도 축하하는 곳. 부트캠프는 시작점일 뿐, 진짜 빌딩은 여기서 시작됩니다.
              </p>
            </div>

            <div className="relative grid gap-3">
              <CommItem icon={<HandshakeIcon />} title="서로의 앱 고도화"           desc="코드 리뷰 · 아이디어 피드백" />
              <CommItem icon={<Rocket />}        title="사이드 프로젝트 → 창업"     desc="실제 서비스로 발전시키는 트랙" />
              <CommItem icon={<CalendarDays />}  title="정기 빌더 데이"             desc="월 1회 이상 오프라인 작업 모임" />
            </div>
          </div>
        </div>
      </section>

      {/* ────────  faq  ──────── */}
      <section id="faq" className="bg-cream py-24 sm:py-32">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <SectionHead
            kicker="FAQ"
            title={<>자주 묻는<br /><span className="text-orange">질문.</span></>}
            sub="아래에서 답을 못 찾으시면 카톡 오픈채팅에 편하게 물어보세요."
          />

          <div className="mt-10 space-y-3">
            <Faq q="코딩을 하나도 모르는데 정말 따라갈 수 있나요?" open
                 a="네. 모든 코드는 Claude Code가 만들어 줍니다. 강의에서는 ‘원하는 것을 한국어로 잘 설명하는 법’과 ‘에러 메시지를 복사해서 붙여 넣는 법’이 핵심입니다. 컴퓨터로 폴더 만들기 · 파일 열기 정도면 충분해요." />
            <Faq q="Mac · Windows 둘 다 가능한가요?"
                 a="둘 다 가능합니다. 강의 자료는 Windows 기준으로 화면과 명령어가 정리되어 있지만, Mac 단축키·터미널 명령어가 워크북에 함께 들어 있어요. 어느 OS든 그대로 따라오시면 됩니다." />
            <Faq q="3만 원 외에 추가 비용이 있나요? AI 코딩 도구 유료 플랜은 꼭 필요한가요?"
                 a="3만 원은 공간 대여비와 노쇼 방지용 책임비입니다. 강의에서 쓰는 Supabase · Gemini · Vercel · GitHub은 모두 개인 학습용 무료 한도 안에서 진행돼요. AI 코딩 도구는 Claude Code Pro(월 $20) 또는 GPT Go(월 $4.99) 중 하나를 권장드립니다. 둘 다 무료 버전은 사용량 한도가 빠듯해서 6차시 실습을 끝까지 돌리기 어렵습니다. 부트캠프 기간 한 달만 결제해 보시는 걸 추천드려요." />
            <Faq q="준비물이 따로 있나요?"
                 a="Mac 또는 Windows 10/11 노트북(RAM 8GB+, 저장공간 5GB+), 안정적인 인터넷, Gmail 계정 정도면 됩니다. GitHub 계정만 미리 만들어 두면 Supabase · Vercel · Anthropic 가입이 한 번에 끝나서 시간이 단축돼요." />
            <Faq q="강의 중에 본인 아이디어로 바꿔서 만들어도 되나요?"
                 a="권장합니다. 메인 예시는 AI 메모장이지만, 같은 뼈대로 일기 · 독서록 · 운동 일지 · 식단 코칭 · 그림 일기 등으로 바로 변형할 수 있어요. 워크북에 만능 변형 프롬프트가 포함되어 있습니다." />
            <Faq q="강의 후에 막히면 어디서 도움받나요?"
                 a="카카오 오픈채팅과 ‘이거해줘’ 빌더 커뮤니티에서 자유롭게 질문해 주세요. 워크북 끝의 ‘막힐 때 에러 패턴 모음’이 대부분을 커버하고, 나머지는 동네 모임과 채팅방에서 함께 해결합니다." />
          </div>
        </div>
      </section>

      {/* ────────  bottom CTA  ──────── */}
      <section className="bg-bg py-24 sm:py-28 border-t border-line">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8 text-center">
          <span className="tag-pill mx-auto"><Sparkles className="h-3.5 w-3.5" />{dateShort} · 단 5명</span>
          <h2 className="h-display-tight mt-5 text-[36px] sm:text-[48px] lg:text-[60px] text-balance">
            아이디어를 머릿속에만
            <br />
            두지 마세요. <span className="text-orange">{datePunch}, 띄웁니다.</span>
          </h2>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href="#join" className="btn-orange group">
              부트캠프 신청하기
              <ArrowRight className="arr-chev h-4 w-4" />
            </a>
            <a href="https://open.kakao.com/o/pJJaDNsi" target="_blank" rel="noopener" className="btn-ghost-light group">
              카톡으로 먼저 물어보기
              <ArrowUpRight className="arr-chev h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ────────  footer  ──────── */}
      <footer className="bg-fg text-white pt-20 pb-12">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <div className="h-display-tight text-[64px] sm:text-[100px] lg:text-[160px] leading-[0.85] tracking-[-0.06em]">
            haejo<span className="text-orange">.</span>
            <br />
            <span className="text-white/35">by 변상훈</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-16">
            <div>
              <h5 className="text-[12px] tracking-[0.16em] uppercase font-mono text-orange-soft mb-4 font-semibold">About</h5>
              <p className="text-[14px] leading-[1.7] text-white/70 max-w-[400px]">
                비개발자가 자기 손으로 AI 서비스 한 개를 인터넷에 띄우는 2일 완성 부트캠프. 코드를 외우는 대신, AI에게 잘 시키는 법을 배웁니다.
              </p>
            </div>
            <div>
              <h5 className="text-[12px] tracking-[0.16em] uppercase font-mono text-orange-soft mb-4 font-semibold">Sections</h5>
              <ul className="grid gap-2.5 text-[14px] text-white/70">
                <li><a href="#build" className="hover:text-orange-soft">만들 것</a></li>
                <li><a href="#curriculum" className="hover:text-orange-soft">커리큘럼</a></li>
                <li><a href="#stack" className="hover:text-orange-soft">사용 도구</a></li>
                <li><a href="#instructor" className="hover:text-orange-soft">강사 소개</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[12px] tracking-[0.16em] uppercase font-mono text-orange-soft mb-4 font-semibold">Join</h5>
              <ul className="grid gap-2.5 text-[14px] text-white/70">
                <li>
                  <a href="https://daangn.com/kr/share/community/ref/invite-group/92xPE8dxBJ" target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 hover:text-orange-soft">
                    당근 동네 모임 <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a href="https://open.kakao.com/o/pJJaDNsi" target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 hover:text-orange-soft">
                    카카오톡 오픈채팅 <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li><a href="#faq" className="hover:text-orange-soft">자주 묻는 질문</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-7 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[12px] font-mono tracking-wide text-white/40">
            <span>© 2026 haejo · 변상훈</span>
            <span>Claude Code · Next.js · Supabase · Gemini · Vercel</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ─────────────────────────────────────  pieces  ───────────────────────────────────── */

function SectionHead({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: React.ReactNode;
  sub: string;
}) {
  return (
    <div className="max-w-[820px]">
      <span className="tag-pill mb-5">{kicker}</span>
      <h2 className="h-display-tight text-[34px] sm:text-[44px] lg:text-[56px] text-balance">
        {title}
      </h2>
      <p className="mt-5 text-[15.5px] sm:text-[16.5px] leading-[1.7] text-fg-2 max-w-[640px]">
        {sub}
      </p>
    </div>
  );
}

function HeroCell({
  icon,
  k,
  v,
  sub,
  tone,
}: {
  icon: React.ReactNode;
  k: string;
  v: string;
  sub: string;
  tone?: "orange";
}) {
  return (
    <div
      className={[
        "rounded-2xl p-4 border",
        tone === "orange"
          ? "bg-orange-tint border-orange-soft text-orange"
          : "bg-cream border-line text-fg",
      ].join(" ")}
    >
      <span className="inline-flex items-center gap-1.5 text-[10.5px] tracking-[0.14em] uppercase font-mono opacity-70">
        <span className="[&>svg]:h-3 [&>svg]:w-3">{icon}</span>
        {k}
      </span>
      <div className={["h-card text-[17px] mt-1.5", tone === "orange" ? "text-orange" : "text-fg"].join(" ")}>
        {v}
      </div>
      <div className="text-[12px] mt-0.5 opacity-60">{sub}</div>
    </div>
  );
}

function ForWhomCard({
  num,
  tone,
  role,
  icon,
  title,
  desc,
}: {
  num: string;
  tone: "orange" | "green" | "dark";
  role: string;
  icon: React.ReactNode;
  title: React.ReactNode;
  desc: string;
}) {
  const toneClass =
    tone === "orange"
      ? "num-circle"
      : tone === "green"
      ? "num-circle mint"
      : "num-circle peach";
  return (
    <div className="card-soft rounded-[24px] p-7 sm:p-8 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <span className={toneClass}>{num}</span>
        <span className="text-[12px] tracking-wide uppercase font-mono text-muted">{role}</span>
      </div>
      <span className="grid place-items-center h-12 w-12 rounded-2xl bg-cream text-orange [&>svg]:h-5 [&>svg]:w-5">
        {icon}
      </span>
      <h3 className="h-card text-[20px] sm:text-[22px]">{title}</h3>
      <p className="text-[14.5px] leading-[1.65] text-fg-2 m-0">{desc}</p>
    </div>
  );
}

function FeatCard({
  accent,
  icon,
  label,
  title,
  desc,
}: {
  accent: "peach" | "mint" | "dark";
  icon: React.ReactNode;
  label: string;
  title: React.ReactNode;
  desc: string;
}) {
  const bg =
    accent === "peach"
      ? "bg-peach"
      : accent === "mint"
      ? "bg-mint"
      : "bg-fg text-white";
  const labelCls = accent === "dark" ? "tag-pill dark" : "tag-pill";
  const descCls = accent === "dark" ? "text-white/75" : "text-fg-2";
  return (
    <div className={["relative overflow-hidden rounded-[24px] p-7 sm:p-8 min-h-[260px] flex flex-col justify-between transition-transform hover:-translate-y-1", bg].join(" ")}>
      <div className="flex items-center gap-3">
        <span className={["grid place-items-center h-10 w-10 rounded-2xl [&>svg]:h-4 [&>svg]:w-4", accent === "dark" ? "bg-white/12 text-orange-soft" : "bg-white text-orange"].join(" ")}>
          {icon}
        </span>
        <span className={labelCls}>{label}</span>
      </div>
      <div>
        <h4 className="h-display-tight text-[28px] sm:text-[32px] mt-7 mb-3">{title}</h4>
        <p className={["text-[14.5px] leading-[1.65]", descCls].join(" ")}>{desc}</p>
      </div>
    </div>
  );
}

const ideaIcons: Record<string, React.ReactElement> = {
  "AI 강의 노트 정리": <NotebookPen className="h-4 w-4" />,
  "AI 독서 기록장": <BookMarked className="h-4 w-4" />,
  "그림 일기": <ImageIcon className="h-4 w-4" />,
  "운동 일지": <Dumbbell className="h-4 w-4" />,
  "아이디어 노트": <Lightbulb className="h-4 w-4" />,
  "영화 감상록": <Film className="h-4 w-4" />,
  "하루 회고": <Sun className="h-4 w-4" />,
};

const ideaRows = [
  { idx: "04", title: "AI 강의 노트 정리", data: "수업 중 적은 거친 노트", out: "요점 정리 + 키워드 추출" },
  { idx: "05", title: "AI 독서 기록장", data: "책 인용 · 감상 메모", out: "책별 요약 + 비슷한 책 추천" },
  { idx: "06", title: "그림 일기", data: "오늘의 일기 텍스트", out: "일기 → 그림 자동 생성" },
  { idx: "07", title: "운동 일지", data: "종목 · 세트 · 무게", out: "약점 분석 + 다음 주 루틴" },
  { idx: "08", title: "아이디어 노트", data: "사업 · 발명 아이디어", out: "보완점 + 실행 단계 제안" },
  { idx: "09", title: "영화 감상록", data: "본 작품 + 짧은 감상", out: "취향 분석 + 다음 추천작" },
  { idx: "10", title: "하루 회고", data: "오늘 일 · 감정", out: "감정 패턴 + 격려 멘트" },
];

function IdeaRow({ idx, title, data, out }: { idx: string; title: string; data: string; out: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[60px_2fr_2fr_2.4fr] items-center px-6 sm:px-8 py-4 sm:py-5 hover:bg-cream transition-colors">
      <div className="hidden sm:block font-mono text-[12px] text-muted">{idx}</div>
      <div className="inline-flex items-center gap-2.5 h-card text-[15.5px]">
        <span className="grid place-items-center h-8 w-8 rounded-full bg-orange-tint text-orange flex-none">
          {ideaIcons[title]}
        </span>
        {title}
      </div>
      <div className="text-[14px] text-fg-3 mt-1.5 sm:mt-0 before:content-['데이터:_'] sm:before:content-none before:text-muted">
        {data}
      </div>
      <div className="text-[14px] text-fg-2 mt-1 sm:mt-0 before:content-['AI:_'] sm:before:content-none before:text-orange before:font-semibold">
        {out}
      </div>
    </div>
  );
}

function Outcome({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="card-soft rounded-[24px] p-6 sm:p-7 flex gap-4 items-start">
      <span className="grid place-items-center h-12 w-12 rounded-2xl bg-orange-tint text-orange flex-none [&>svg]:h-5 [&>svg]:w-5">
        {icon}
      </span>
      <div>
        <h3 className="h-card text-[17px] mb-1.5">{title}</h3>
        <p className="text-[14px] leading-[1.65] text-fg-2 m-0">{desc}</p>
      </div>
    </div>
  );
}

function Lesson({
  num,
  title,
  desc,
  chips,
  outcome,
}: {
  num: string;
  title: string;
  desc: string;
  chips: string[];
  outcome: string;
}) {
  return (
    <div className="card-soft rounded-[24px] p-6 sm:p-7 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="num-circle">{num}</span>
        <span className="text-[11px] tracking-wide uppercase font-mono text-muted">60 MIN</span>
      </div>
      <h4 className="h-card text-[18px] sm:text-[19px] leading-[1.3]">{title}</h4>
      <p className="text-[14px] leading-[1.65] text-fg-2 m-0">{desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {chips.map((c) => (
          <span
            key={c}
            className="font-mono text-[10.5px] font-medium rounded-md border border-line bg-bg text-fg-2 py-1 px-2 tracking-wide"
          >
            {c}
          </span>
        ))}
      </div>
      <div className="mt-auto rounded-2xl bg-fg text-white p-4">
        <span className="inline-flex items-center gap-2 text-[10.5px] tracking-wide uppercase font-mono text-orange-soft mb-2">
          <Target className="h-3 w-3" />
          손에 쥐는 것
        </span>
        <div className="text-[13.5px] leading-[1.55]">{outcome}</div>
      </div>
    </div>
  );
}

function Tool({
  tone,
  icon,
  meta,
  name,
  desc,
}: {
  tone: "orange" | "peach" | "green" | "dark";
  icon: React.ReactNode;
  meta: string;
  name: string;
  desc: string;
}) {
  const bg =
    tone === "orange"
      ? "bg-bg"
      : tone === "peach"
      ? "bg-peach/60"
      : tone === "green"
      ? "bg-mint/70"
      : "bg-fg text-white";
  const iconBg =
    tone === "dark"
      ? "bg-white/12 text-orange-soft"
      : "bg-orange-tint text-orange";
  const descCls = tone === "dark" ? "text-white/70" : "text-fg-2";
  const metaCls = tone === "dark" ? "text-white/55" : "text-muted";
  return (
    <div className={["card-soft rounded-[20px] p-6 sm:p-7 min-h-[210px] flex flex-col gap-3", bg, "hover:-translate-y-1"].join(" ")}>
      <span className={["grid place-items-center h-11 w-11 rounded-2xl [&>svg]:h-5 [&>svg]:w-5", iconBg].join(" ")}>
        {icon}
      </span>
      <span className={["text-[11px] tracking-wide uppercase font-mono mt-2", metaCls].join(" ")}>{meta}</span>
      <span className="h-card text-[20px] -mt-1">{name}</span>
      <p className={["text-[13.5px] leading-[1.6] mt-auto m-0", descCls].join(" ")}>{desc}</p>
    </div>
  );
}

function Cred({
  icon,
  k,
  v,
}: {
  icon: React.ReactNode;
  k: string;
  v: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-cream p-4 border border-line">
      <div className="inline-flex items-center gap-1.5 text-[11px] tracking-wide uppercase font-mono text-muted mb-2 [&>svg]:h-3 [&>svg]:w-3">
        <span className="text-orange [&>svg]:h-3 [&>svg]:w-3">{icon}</span>
        {k}
      </div>
      <div className="h-card text-[15.5px] leading-[1.3]">{v}</div>
    </div>
  );
}

function JoinMeta({ icon, k, v }: { icon: React.ReactNode; k: string; v: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-4">
      <span className="inline-flex items-center gap-1.5 text-[10.5px] tracking-[0.14em] uppercase font-mono text-orange-soft mb-1.5 [&>svg]:h-3 [&>svg]:w-3">
        {icon}
        {k}
      </span>
      <div className="h-card text-[16.5px]">{v}</div>
    </div>
  );
}

function Channel({
  href,
  tag,
  title,
  sub,
  bg,
}: {
  href: string;
  tag: string;
  title: string;
  sub: string;
  bg: "orange" | "yellow";
}) {
  const tagBg = bg === "orange" ? "bg-orange text-white" : "bg-[#FAE100] text-[#3C1E1E]";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="arr-host group grid grid-cols-[56px_1fr_24px] gap-4 items-center rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/30 px-5 py-4 transition-[background,border-color,transform] hover:-translate-y-0.5"
    >
      <span className={["grid place-items-center h-14 w-14 rounded-2xl font-bold text-[14px] tracking-[-0.02em]", tagBg].join(" ")}>
        {tag}
      </span>
      <span className="block">
        <span className="block h-card text-[16.5px]">{title}</span>
        <span className="block text-[12.5px] text-white/55 mt-0.5">{sub}</span>
      </span>
      <ArrowUpRight className="arr-chev h-5 w-5 opacity-50 group-hover:opacity-100 group-hover:text-orange-soft" />
    </a>
  );
}

function CommItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-white p-4 sm:p-5 flex items-center gap-4 border border-mint-deep/40">
      <span className="grid place-items-center h-11 w-11 rounded-2xl bg-mint-deep/60 text-[#136f37] flex-none [&>svg]:h-5 [&>svg]:w-5">
        {icon}
      </span>
      <div>
        <div className="h-card text-[15.5px]">{title}</div>
        <div className="text-[13px] text-fg-3 mt-0.5">{desc}</div>
      </div>
      <CircleCheckBig className="h-5 w-5 text-green ml-auto flex-none" />
    </div>
  );
}

function Faq({ q, a, open }: { q: string; a: string; open?: boolean }) {
  return (
    <details className="card-soft rounded-2xl px-6 sm:px-7 [&[open]]:bg-bg" open={open}>
      <summary className="cursor-pointer flex items-center justify-between gap-5 py-5 sm:py-6 h-card text-[16px] sm:text-[17px]">
        <span className="flex-1">{q}</span>
        <span className="qa-plus" />
      </summary>
      <div className="pb-6 sm:pb-7 text-[14.5px] leading-[1.7] text-fg-2 max-w-[760px]">
        {a}
      </div>
    </details>
  );
}
