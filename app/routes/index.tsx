import { useEffect } from "react";
import { ActionFunction, Link, LoaderFunction, MetaFunction, useLoaderData, useSubmit } from "remix";
import { getRooms, Room } from "~/modules/room";
import { supabaseClient } from "~/modules/supabase/supabase.client";
import { authenticator } from "~/services/auth.server";

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: "Inner Light",
    description: "color related experiments",
  };
};

export const loader: LoaderFunction = () => {

  return getRooms();
}

// https://remix.run/guides/routing#index-routes
export default function Index() {

  const data = useLoaderData<Room[]>();

  return (
    <div className="box overflow-scroll p-8 flex flex-col items-stretch w-full h-full m-auto gap-8">
      <section className="text-center">
        <h1 className="text-5xl font-extrabold font-display">
          Patterns.Blue
        </h1>
        <p>
          select one the rooms to begin with
        </p>
      </section>
      <section className="grid gap-4 grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3">
        {
          data.map(({ title, id, coverImageUrl, description }, index) => (
            <Link to={`boom/${id}`} key={`card-${index}`} className="box text-center shadow-lg overflow-hidden w-full flex flex-col items-center gap-4 hover:shadow-2xl hover:scale-105">
              <img src={coverImageUrl} className="h-64 w-full object-cover border-b shadow-inner select-none" alt="" />
              <h4 className="text-xl px-4 font-bold font-display">{title}</h4>
              <p className="px-4 pb-8">
                {description}
              </p>
            </Link>
          ))
        }
      </section>
    </div>
  );
}
