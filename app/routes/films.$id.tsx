import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import clsx from "clsx";
import BackButton from "~/components/ui/buttons/BackButton";
import { BaseFilmsProps } from "~/interfaces";
import { ofetch } from "~/lib/utils/configuredOfetch";

export async function loader({ params }: LoaderArgs) {
  const { id } = params;
  const response: BaseFilmsProps = await ofetch(
    `https://ghibli-api.vercel.app/api/films/${id}`
  );

  return json({ film: response });
}

export default function DetailFilm() {
  const { film } = useLoaderData<typeof loader>();

  const {
    movie_banner,
    title,
    director,
    producer,
    release_date,
    rt_score,
    description,
  } = film;

  return (
    <div className="flex w-full items-center justify-center">
      <div
        className={clsx(
          "flex flex-col items-center justify-center",
          "md:w-[600px]"
        )}
      >
        <img className="rounded-md" src={movie_banner} alt={title} />
        <h3 className="mb-8 mt-5 text-3xl font-bold">{title}</h3>
        <div className="space-y-2 text-base">
          <p>
            <span className="font-bold">Director</span> {director}
          </p>
          <p>
            <span className="font-bold">Producer:</span> {producer}
          </p>
          <p>
            <span className="font-bold">Release Date:</span> {release_date}
          </p>
          <p>
            <span className="font-bold">Score:</span> {rt_score}
          </p>
          <p>
            <span className="font-bold">Description:</span> {description}
          </p>
        </div>
        <BackButton link="/films" />
      </div>
    </div>
  );
}
