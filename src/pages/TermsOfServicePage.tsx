const TermsOfServicePage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-slate-300">
      <h1 className="text-3xl font-bold text-white mb-8"> 이용약관</h1>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">
            제1장 총칙
          </h2>
          <div className="space-y-6">
            <article>
              <h3 className="text-lg font-bold text-blue-400 mb-2">
                제1조 목적
              </h3>
              <p className="leading-relaxed">
                이 약관은 scriptum(이하 ‘당사’)에서 제공하는 서비스 이용조건 및
                절차에 관한 사항과 기타 필요한 사항을 본사과 이용자의 권리, 의미
                및 책임사항 등을 규정함을 목적으로 합니다.
              </p>
            </article>

            <article>
              <h3 className="text-lg font-bold text-blue-400 mb-2">
                제2조 약관의 효력과 변경
              </h3>
              <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
                <li>이 약관은 이용자에게 공시함으로서 효력이 발생합니다.</li>
                <li>
                  본사은 사정 변경의 경우와 영업상 중요사유가 있을 때 약관을
                  변경할 수 있으며, 변경된 약관은 전항과 같은 방법으로 효력이
                  발생합니다.
                </li>
              </ul>
            </article>

            <article>
              <h3 className="text-lg font-bold text-blue-400 mb-2">
                제3조 약관 외 준칙
              </h3>
              <p className="leading-relaxed">
                이 약관에 명시되지 않은 사항이 관계법령에 규정되어 있을 경우에는
                그 규정에 따릅니다.
              </p>
            </article>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">
            제2장 회원 가입과 서비스 이용
          </h2>
          <div className="space-y-6">
            <article>
              <h3 className="text-lg font-bold text-blue-400 mb-2">
                제1조 회원의 정의
              </h3>
              <p className="leading-relaxed">
                회원이란 본사에서 회원으로 적합하다고 인정하는 일반 개인으로 본
                약관에 동의하고 서비스의 회원가입 양식을 작성하고 ‘ID’와
                ‘비밀번호’를 발급받은 사람을 말합니다.
              </p>
            </article>

            <article>
              <h3 className="text-lg font-bold text-blue-400 mb-2">
                제2조 서비스 가입의 성립
              </h3>
              <ul className="list-decimal pl-5 space-y-2 marker:text-slate-500">
                <li>
                  서비스 가입은 이용자의 이용신청에 대한 본사의 이용승낙과
                  이용자의 약관내용에 대한 동의로 성립됩니다.
                </li>
                <li>
                  회원으로 가입하여 서비스를 이용하고자 하는 희망자는 본사에서
                  요청하는 개인 신상정보를 제공해야 합니다.
                </li>
                <li>
                  이용자의 가입신청에 대하여 본사에서 승낙한 경우, 본사은 회원
                  ID와 기타 본사에서 필요하다고 인정하는 내용을 이용자에게
                  통지합니다.
                </li>
                <li>
                  가입할 때 입력한 ID는 변경할 수 없으며, 한 사람에게 오직 한
                  개의 ID가 발급됩니다.
                </li>
                <li>
                  본사는 다음 각 호에 해당하는 가입신청에 대하여는 승낙하지
                  않습니다.
                  <ul className="list-disc pl-5 mt-2 space-y-1 marker:text-red-400">
                    <li>다른 사람의 명의를 사용하여 신청하였을 때</li>
                    <li>본인의 실명으로 신청하지 않았을 때</li>
                    <li>가입 신청서의 내용을 허위로 기재하였을 때</li>
                    <li>
                      사회의 안녕과 질서 혹은 미풍양속을 저해할 목적으로
                      신청하였을 때
                    </li>
                  </ul>
                </li>
              </ul>
            </article>

            <article>
              <h3 className="text-lg font-bold text-blue-400 mb-2">
                제3조 서비스 이용 및 제한
              </h3>
              <ul className="list-decimal pl-5 space-y-2 marker:text-slate-500">
                <li>
                  서비스 이용은 회사의 업무상 또는 기술상 특별한 지장이 없는 한
                  연중무휴, 1일 24시간을 원칙으로 합니다.
                </li>
                <li>
                  전항의 서비스 이용시간은 시스템 정기점검 등 본사에서 필요한
                  경우, 회원에게 사전 통지한 후 제한할 수 있습니다.
                </li>
                <li>
                  서비스 내용 중 온라인상담은 답변하는 담당자의 개인사정에 따라
                  1일 24시간 서비스가 불가능 할 수도 있습니다.
                </li>
              </ul>
            </article>

            <article>
              <h3 className="text-lg font-bold text-blue-400 mb-2">
                제4조 서비스의 사용료
              </h3>
              <ul className="list-decimal pl-5 space-y-2 marker:text-slate-500">
                <li>
                  서비스는 회원으로 등록한 모든 사람들이 무료로 사용할 수
                  있습니다.
                </li>
                <li>
                  본사에서 서비스를 유료화할 경우 유료화의 시기, 정책, 비용에
                  대하여 유료화 실시 이전에 서비스에 공시하여야 합니다.
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">
            제3장 서비스 탈퇴, 재가입 및 이용 제한
          </h2>
          <div className="space-y-6">
            <article>
              <h3 className="text-lg font-bold text-blue-400 mb-2">
                제1조 서비스 탈퇴
              </h3>
              <ul className="list-decimal pl-5 space-y-2 marker:text-slate-500">
                <li>
                  회원이 서비스의 탈퇴를 원하면 회원 본인이 직접 해지 신청을
                  요청해야 합니다.
                </li>
                <li>
                  탈퇴 여부는 기존의 ID와 비밀번호로 로그인이 되지 않으면 해지된
                  것입니다.
                </li>
              </ul>
            </article>

            <article>
              <h3 className="text-lg font-bold text-blue-400 mb-2">
                제2조 서비스 재가입
              </h3>
              <ul className="list-decimal pl-5 space-y-2 marker:text-slate-500">
                <li>
                  제1조에 의하여 서비스에서 탈퇴한 사용자가 재가입을 원할 경우,
                  회원 본인이 직접 해지 신청을 요청하면 됩니다.
                </li>
                <li>
                  기존의 ID와 비밀번호로 로그인이 되면 재가입이 이루어진
                  것입니다.
                </li>
              </ul>
            </article>

            <article>
              <h3 className="text-lg font-bold text-blue-400 mb-2">
                제3조 서비스 이용제한
              </h3>
              <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                <p className="mb-3 text-red-200">
                  본사는 회원이 다음 사항에 해당하는 행위를 하였을 경우,
                  사전통지 없이 이용계약을 해지하거나 기간을 정하여 서비스
                  이용을 중지할 수 있습니다.
                </p>
                <ul className="list-disc pl-5 space-y-1 marker:text-red-400 text-slate-300">
                  <li>공공 질서 및 미풍 양속에 반하는 경우</li>
                  <li>범죄적 행위에 관련되는 경우</li>
                  <li>
                    국익 또는 사회적 공익을 저해할 목적으로 서비스 이용을 계획
                    또는 실행할 경우
                  </li>
                  <li>타인의 ID 및 비밀번호를 도용한 경우</li>
                  <li>타인의 명예를 손상시키거나 불이익을 주는 경우</li>
                  <li>같은 사용자가 다른 ID로 이중 등록을 한 경우</li>
                  <li>서비스에 위해를 가하는 등 건전한 이용을 저해하는 경우</li>
                  <li>
                    기타 관련 법령이나 본사에서 정한 이용조건에 위배되는 경우
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">
            제4장 의무
          </h2>
          <div className="space-y-6">
            <article>
              <h3 className="text-lg font-bold text-blue-400 mb-2">
                제1조 회사의 의무
              </h3>
              <ul className="list-decimal pl-5 space-y-2 marker:text-slate-500">
                <li>
                  본사는 특별한 사정이 없는 한 회원이 서비스를 이용할 수 있도록
                  합니다.
                </li>
                <li>
                  본사는 이 약관에서 정한 바에 따라 계속적, 안정적으로 서비스를
                  제공할 의무가 있습니다.
                </li>
                <li>
                  본사는 회원으로부터 소정의 절차에 의해 제기되는 의견에 대해서
                  적절한 절차를 거쳐 처리하며, 처리 시 일정기간이 소요될 경우
                  회원에게 그 사유와 처리 일정을 알려주어야 합니다.
                </li>
              </ul>
            </article>

            <article>
              <h3 className="text-lg font-bold text-blue-400 mb-2">
                제2조 회원정보 보안의 의무
              </h3>
              <ul className="list-decimal pl-5 space-y-2 marker:text-slate-500">
                <li>
                  회원의 ID와 비밀번호에 관한 모든 관리의 책임은 회원에게
                  있습니다.
                </li>
                <li>
                  회원은 서비스의 일부로 보내지는 서비스의 전자우편을 받는 것에
                  동의합니다.
                </li>
                <li>
                  자신의 ID가 부정하게 사용된 경우, 회원은 반드시 본사에 그
                  사실을 통보해야 합니다.
                </li>
                <li>
                  본사는 개인의 신분 확인이 가능한 정보를 회원 혹은 사용자의
                  사전허락 없이 본사와 관계가 없는 제3자에게 팔거나 제공하지
                  않습니다. 그러나 본사는 자발적으로 제공된 등록된 정보를 다음과
                  같은 경우에 활용할 수 있습니다.
                  <ul className="list-disc pl-5 mt-2 space-y-1 marker:text-slate-500">
                    <li>
                      회원들에게 유용한 새 기능, 정보, 서비스 개발에 필요한
                      정보를 개발자들에게 제공하는 경우
                    </li>
                    <li>
                      광고주들에게 서비스 회원과 사용자 집단에 대한 통계적(결코
                      회원 개개인의 신분이 드러나지 않는) 정보를 제공하는 경우
                    </li>
                    <li>
                      회원과 사용자 선호에 따른 광고 또는 서비스를 실시하기
                      위하여 회사에서 사용하는 경우
                    </li>
                  </ul>
                </li>
                <li>
                  게시판 등의 커뮤니케이션 공간(이하 커뮤니케이션 공간)에
                  개인신분 확인이 가능한 정보(사용자 이름, ID, e-mail 주소 등)가
                  자발적으로 공개될 수 있습니다. 이런 경우 공개된 정보가 제3자에
                  에 의해 수집되고, 연관되어지며, 사용될 수 있으며 제3자로부터
                  원하지 않는 메시지를 받을 수도 있습니다. 제3자의 그러한 행위는
                  본사에서 통제할 수 없습니다. 따라서 본사는 본사에서 통제할 수
                  없는 방법에 의한 회원정보의 발견 가능성에 대해 아무런 보장을
                  하지 않습니다.
                </li>
                <li>
                  본사는 서비스의 사용의 편의를 위하여 Cookie 기술을 사용할 수
                  있습니다. Cookie란 다시 방문하는 사용자를 파악하고 그 사용자의
                  계속된 접속과 개인화된 서비스 제공을 돕기 위해 웹사이트가
                  사용하는 작은 텍스트 파일입니다. 일반적으로 Cookie는 Cookie를
                  부여한 사이트 밖에서는 의미가 없는 유일한 번호를 사용자에게
                  부여하는 방식으로 작동합니다. Cookie는 사용자의 시스템 내부로
                  침입하지 않으며 사용자의 파일에 위험하지 않습니다. 본원은
                  서비스의 광고주나 관련있는 제3자가 Cookie를 사용하는 것을 막을
                  수 없습니다. 회원 혹은 사용자가 Cookie를 사용한 정보수집을
                  원하지 않는 경우에는 웹 브라우저에서 Cookie를 받아들일지
                  여부를 조절할 수 있습니다. 하지만 서비스(특히, 개인화된
                  정보)가 제대로 작동하기 위해서는 Cookie의 사용이 필요할 수
                  있습니다.
                </li>
                <li>
                  본사는 회원의 정보를 서비스 또는 회사와 업무제휴 업체간에 상호
                  제공/활용할 수 있습니다.
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">
            제5장 분쟁조정
          </h2>
          <ul className="list-decimal pl-5 space-y-2 marker:text-slate-500">
            <li>
              본 이용약관에 규정된 것을 제외하고 발생하는 서비스 이용에 관한
              제반문제에 관한 분쟁은 최대한 쌍방합의에 의해 해결하도록 한다.
            </li>
            <li>
              서비스 이용으로 발생한 분쟁에 대해 소송이 제기될 경우 회사의
              소재지를 관할하는 법원을 관할법원으로 합니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">
            제7장 제휴 링크에 대한 안내
          </h2>
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 space-y-4">
            <p className="leading-relaxed">
              본사는 서비스 향상 및 웹사이트 운영 지원을 위해 제휴 링크를 포함할
              수 있습니다. 이러한 제휴 링크는 본사가 추천하며 현재 직접 사용하고
              있는 온라인 수익화 도구와 관련된 상품이나 서비스로 연결됩니다.
              사용자가 이러한 링크를 통해 구매를 진행할 경우, 본사는 소정의
              커미션을 받게 됩니다. 이는 본사에 대한 추가 비용 없이 본사의
              서비스를 지원하는 방법 중 하나입니다.
            </p>
            <ul className="list-decimal pl-5 space-y-2 marker:text-slate-500">
              <li>
                본사는 투명성을 유지하기 위해 사용자에게 제휴 링크 사용 사실을
                공개합니다. 제휴 링크를 통한 구매는 사용자에게 추가 비용을
                발생시키지 않으며, 제공되는 커미션은 웹사이트의 지속적인 운영과
                서비스 개선에 기여합니다.
              </li>
              <li>
                제휴 링크를 통해 제공되는 상품이나 서비스는 워플의 엄격한 선정
                기준을 통과한 것으로, 사용자에게 실질적인 가치를 제공하도록
                노력합니다.
              </li>
              <li>
                본사는 제휴 링크를 통해 제공되는 모든 상품이나 서비스에 대해
                직접적인 책임을 지지 않습니다. 구매 결정은 전적으로 사용자의
                판단에 따르며, 제품 선택 과정에서 발생할 수 있는 문제에 패해서는
                해당 제품 또는 서비스 제공업체에 문의해야 합니다.
              </li>
              <li>
                본사는 사용자가 제휴 링크를 통해 접근하는 모든 외부 사이트의
                내용이나 정확성에 대해 책임을 지지 않습니다.
              </li>
            </ul>
            <p className="mt-4 text-sm text-slate-400">
              이 섹션의 목적은 사용자가 본사의 제휴 링크 사용에 대해 완전히
              이해하고, 본사와의 신뢰 관계를 기반으로 정보에 입각한 결정을 내릴
              수 있도록 하는 것입니다.
            </p>
          </div>
        </section>

        <div className="mt-16 pt-8 border-t border-white/10 text-right">
          <span className="text-slate-500 text-sm">시행일자: </span>
          <span className="text-white font-medium">2024년 1월 1일</span>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
