import Image from "next/image";
import schemaListJSON from "../data/fileList.json" assert { type: "json" };

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-24">
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
          <a
            href={`/files/${schema.fileName}`}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            key={schema.fileName}
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              {schema.title}
              {` `}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 text-sm opacity-50">{schema.description}</p>
          </a>
        );
      })}
    </main>
  );
}
