
export default function Mind() {
    return (
        <section className="w-full tablet:w-3/4 desktop:w-2/3 flex flex-col items-center z-route20">
            <h2 className="text-blue-500 font-bold text-3xl">Mind</h2>
            <input
                type="search"
                className="text-2xl placeholder:italic m-4 p-4 rounded-t-2xl pb-2 w-full border-0 border-b bg-transparent"
                placeholder="Search your thoughts ..."
            />
            <div className="grid grid-cols-3 gap-4">
                <div className="box p-4">
                    A thought bubbles up
                </div>
                <div className="box p-4">
                    Another long thought I had thinking about this stuff.
                </div>
                <div className="box p-4">
                    Want this page to be a free floating area of ideas, just inserting them here
                </div>

                <div className="box p-4">
                    <h5>
                        How about markdown?
                    </h5>
                    Want this page to be a free floating area of ideas, just inserting them here
                </div>

                <div className="box col-span-2 p-4">
                    <figure>
                        <img src="/img/reef1.jpg" alt="a coral reef" />
                        <figcaption>
                            Photo by <a href="https://unsplash.com/@biorock_indonesia?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Biorock Indonesia</a> on <a href="https://unsplash.com/s/photos/coral-reef?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
                        </figcaption>
                    </figure>

                </div>
                <div className="box col-span-2 p-4">
                    <figure>
                        <img src="/img/mushroom.jpg" alt="little red mushrooms on a tree branch" />
                        <figcaption>
                            Source: Unsplash
                        </figcaption>
                    </figure>

                </div>
            </div>
        </section>
    )
}
