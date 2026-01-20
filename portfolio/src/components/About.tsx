import { useTranslations } from "next-intl";
import { experienceIds } from "@/data/profile";

export function About() {
  const t = useTranslations();

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          {t("about.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t("about.whoAmI")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t("profile.bio")}
            </p>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium text-gray-900 dark:text-white">
                  {t("about.location")}:
                </span>{" "}
                {t("profile.location")}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium text-gray-900 dark:text-white">
                  {t("about.email")}:
                </span>{" "}
                <a
                  href={`mailto:${t("profile.email")}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t("profile.email")}
                </a>
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t("about.experience")}
            </h3>
            <div className="space-y-6">
              {experienceIds.map((expId) => (
                <div
                  key={expId}
                  className="border-l-2 border-blue-600 pl-4 py-1"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {t(`experiences.${expId}.title`)}
                  </h4>
                  <p className="text-blue-600 dark:text-blue-400 text-sm">
                    {t(`experiences.${expId}.company`)} |{" "}
                    {t(`experiences.${expId}.period`)}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    {t(`experiences.${expId}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
