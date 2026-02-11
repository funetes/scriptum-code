import { useLoaderData, useParams } from "react-router";
import type { ScriptOverview } from "../types/script";
import { ScriptCard } from "../components/ScriptCard";

const ScriptListPage = () => {
  const { categoryId } = useParams();
  const { scripts } = useLoaderData<{
    scripts: ScriptOverview[];
  }>();

  const sortedScripts = [...scripts].sort((a, b) => {
    const dateA = a.updatedAt?.seconds || 0;
    const dateB = b.updatedAt?.seconds || 0;
    return dateB - dateA;
  });

  return (
    <div className="flex justify-center w-full text-neutral-300 ">
      <div className="flex flex-col w-full max-w-5xl mb-4 px-4 md:px-6">
        {sortedScripts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
            {sortedScripts.map((script) => (
              <ScriptCard
                key={script.id}
                script={script}
                categoryId={categoryId}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-neutral-900/30 rounded-3xl border border-dashed border-neutral-800">
            <p className="text-neutral-500 text-lg">
              No scripts available in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScriptListPage;
