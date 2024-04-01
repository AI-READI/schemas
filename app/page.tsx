import Image from "next/image";
import schemaListJSON from "../data/fileList.json" assert { type: "json" };

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-24 bg-black text-slate-50">
      <a
        className="flex flex-row space-x-4 items-end justify-start px-5"
        href="https://aireadi.org"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image
          src="https://fairdataihub.org/images/hero/aireadi-logo.png"
          alt="AI-READI logo"
          width={50}
          height={50}
        />

        <h1 className="text-5xl font-bold">AI-READI Schemas</h1>
      </a>

      <h2 className="px-5 text-base font-medium mt-6 mb-3">
        A collection of schemas used in AI-READI applications
      </h2>

      <hr className="border-slate-700 w-full h-[1px] mt-4 mb-8 px-5" />

      {schemaListJSON.map((schema) => {
        return (
          <div key={schema.fileName} className="relative px-4 mb-8">
            <h3 className="text-2xl font-semibold">{schema.title}</h3>

            <p className="text-sm text-slate-200 mt-1 mb-3">
              {schema.description}
            </p>

            <hr className="border-slate-700 w-full h-[1px] mt-4 mb-5 px-5 border-dashed" />

            <ul>
              {schema.versions.map((version) => {
                return (
                  <li
                    key={version.label}
                    className="ml-4 border rounded-md mb-2 w-max border-transparent hover:border-slate-500 transition-all cursor-pointer"
                  >
                    <a
                      href={`https://schema.aireadi.org/${
                        version.fileLabel ? `${version.fileLabel}/` : ""
                      }${schema.fileName}`}
                      className="w-full flex items-center px-3 py-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="text-2xl font-semibold">
                        {version.label}
                        {` `}
                        <span className="">-&gt;</span>
                      </p>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </main>
  );
}
