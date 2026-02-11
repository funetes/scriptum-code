import { Play, FileText, Globe } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-4 px-4 mb-8">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-neutral-400 mb-10 leading-relaxed max-w-2xl mx-auto">
          유튜브의 한국어 자막 데이터를 동기화하여 시청 경험을 개선하기 위한
          도구입니다. 영상과 스크립트를 동시에 보며 더 깊이 있는 학습과 이해를
          경험해보세요.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Play className="w-8 h-8 text-red-500" />}
            title="영상 동기화"
            description="유튜브 영상과 정확히 동기화된 스크립트를 실시간으로 확인하세요."
          />
          <FeatureCard
            icon={<FileText className="w-8 h-8 text-blue-500" />}
            title="스크립트 뷰어"
            description="가독성 높은 한국어 스크립트로 내용 파악이  더욱 쉬워집니다."
          />
          <FeatureCard
            icon={<Globe className="w-8 h-8 text-green-500" />}
            title="다국어 학습"
            description="한국어 자막을 통해 외국어 영상의 내용을 명확하게 이해할 수 있습니다."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-neutral-800/50 p-6 rounded-xl border border-neutral-700/50 hover:bg-neutral-800 transition-colors">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-neutral-400 leading-relaxed">{description}</p>
    </div>
  );
}
