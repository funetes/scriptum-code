const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-slate-300">
      <h1 className="text-3xl font-bold text-white mb-8">개인정보 처리방침</h1>

      <p className="mb-10 leading-relaxed text-lg text-slate-200">
        scriptum(이하 ‘당사’)은 고객의 개인정보 보호를 매우 중요하게 여기며,
        개인정보보호법을 준수하고 있습니다. 당사의 개인정보 취급방침을 통해
        고객님이 제공하시는 개인정보의 사용 목적과 방식, 그리고 개인정보 보호를
        위해 어떠한 조치를 취하고 있는지 알려드립니다.
      </p>

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-500">1.</span> 수집하는 개인정보의 항목
            및 수집방법
          </h2>
          <ul className="list-disc pl-5 space-y-2 marker:text-blue-500 bg-slate-900/50 p-6 rounded-2xl border border-white/5">
            <li>
              <span className="text-white font-medium">
                회원가입 시 필수항목:
              </span>{" "}
              이메일 주소, 닉네임
            </li>
            <li>
              <span className="text-white font-medium">자동 수집 정보:</span>{" "}
              서비스 이용 기록
            </li>
            <li>
              <span className="text-white font-medium">수집방법:</span> 홈페이지
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-500">2.</span> 개인정보의 수집 및
            이용목적
          </h2>
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 space-y-4">
            <p className="font-medium text-white mb-2">
              당사는 수집한 개인정보를 다음 목적을 위해 활용합니다:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
              <li>
                <span className="text-white font-medium">회원 관리:</span>{" "}
                회원제 서비스 이용에 따른 본인 확인, 개인 식별, 불량 회원의 부정
                이용 방지 및 비인가 사용 방지
              </li>
              <li>
                <span className="text-white font-medium">서비스 제공:</span>{" "}
                서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-500">3.</span> 개인정보의 보유 및
            이용기간
          </h2>
          <p className="leading-relaxed pl-2 border-l-4 border-slate-700 py-1">
            당사는 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체
            없이 파기합니다. 다만, 관련 법령에 의해 보존할 필요성이 있는 경우는
            예외로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-500">4.</span> 개인정보의 파기절차 및
            방법
          </h2>
          <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
            <li>
              전자적 파일 형태의 정보는 기술적 방법을 사용하여 영구적으로 삭제
            </li>
            <li>종이 문서에 기록된 개인정보는 분쇄기로 분쇄하거나 소각</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-500">5.</span> 개인정보 제공 및 공유
          </h2>
          <p className="leading-relaxed pl-2 border-l-4 border-slate-700 py-1">
            당사는 고객의 동의 없이 개인정보를 외부에 공유하거나 제공하지
            않습니다. 단, 법령에 의거한 경우나 고객의 안전을 위해 필요한 경우는
            예외입니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-500">6.</span> 개인정보 취급위탁
          </h2>
          <p className="leading-relaxed">
            당사는 서비스 향상을 위해 필요한 경우 외부 업체에 개인정보 처리를
            위탁할 수 있으며, 위탁 시 개인정보 보호를 위한 안전성 확보 조치를
            취합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-500">7.</span> 이용자 및 법정대리인의
            권리와 그 행사 방법
          </h2>
          <p className="leading-relaxed">
            고객은 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수
            있으며, 가입 해지 요청도 할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-500">8.</span> 동의철회 / 회원탈퇴 방법
          </h2>
          <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-blue-200">
            <p className="leading-relaxed">
              웹사이트 내 마이페이지에서 직접 회원탈퇴를 요청할 수 있으며, 탈퇴
              요청 후 즉시 처리됩니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-500">9.</span> 개인정보 자동 수집 장치의
            설치/운영 및 그 거부에 관한 사항
          </h2>
          <p className="leading-relaxed">
            당사는 개인화되고 맞춤화된 서비스를 제공하기 위해 쿠키를 사용할 수
            있으며, 고객은 웹브라우저 설정을 통해 쿠키 저장을 거부할 수
            있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>10.</span> 개인정보관리책임자
          </h2>
          <div className=" p-6 rounded-2xl flex flex-col md:flex-row md:items-center gap-4 border border-white/5">
            <div className="flex items-center gap-3">
              <span className="text-slate-400">담당자</span>
              <span className="text-white font-bold text-lg">김환</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-white/10"></div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400">연락처</span>
              <a
                href="mailto:kimlove2324@gmail.com"
                className=" font-medium transition-colors"
              >
                kimlove2324@gmail.com
              </a>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-500">11.</span> 개인정보의 안전성 확보
            조치
          </h2>
          <p className="leading-relaxed">
            당사는 개인정보의 안전한 보호를 위해 다양한 기술적, 관리적 대책을
            마련하고 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-500">12.</span> 정책 변경에 따른 공지의무
          </h2>
          <p className="leading-relaxed">
            개인정보 취급방침은 법령, 정책, 보안기술의 변경에 따라 내용이 변경될
            수 있으며, 변경 시 웹사이트를 통해 공지할 것입니다.
          </p>
        </section>
      </div>

      <div className="mt-16 pt-8 border-t border-white/10 text-right">
        <span className="text-slate-500 text-sm">시행일자: </span>
        <span className="text-white font-medium">2026년 2월 11일</span>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
