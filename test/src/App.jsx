import { useState } from "react";

const App = () => {
    const [user, setUser] = useState();
    const [error, setError] = useState();

    async function getUsername(username) {
        try {
            const response = await fetch(
                `https://api.github.com/users/${username}`,
            );

            const u = await response.json();

            return u;
        } catch (err) {
            setError(err?.message ?? "Something went wrong");
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const u = await getUsername(formData.get("userName"));

        if (u.message) setError(u.message);
        else setUser(u);
    };

    console.log(user);

    return (
        <div>
            <div className="search-bar background-color">
                <img src="./assets/icon-search.svg" alt="search" />
                <form onSubmit={onSubmit}>
                    <label htmlFor="userName" />
                    <input
                        id="userName"
                        type="text"
                        className="input"
                        name="userName"
                        placeholder="test"
                    />
                    <button className="search-btn" type="submit">
                        Search
                    </button>
                </form>
            </div>
            {user ? (
                <div className="card">
                    <section className="card-avatar">
                        <img src={user.avatar_url} />
                    </section>
                    <div className="card-content">
                        <section className="card-profile">
                            <article className="card-profile-header">
                                <h1>{user.name}</h1>
                                <p>
                                    Joined{" "}
                                    {new Date(
                                        user.created_at,
                                    ).toLocaleDateString("en", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                            </article>
                            <h2 className="card-profile-at">@{user.login}</h2>
                        </section>
                        <p className="card-bio">
                            {user.bio ?? "This profile has no bio"}
                        </p>
                        <section className="card-stats">
                            <article className="card-stat">
                                <span>Repos</span>
                                <strong>{user.public_repos}</strong>
                            </article>
                            <article className="card-stat">
                                <span>Followers</span>
                                <strong>{user.followers}</strong>
                            </article>
                            <article className="card-stat">
                                <span>Following</span>
                                <strong>{user.following}</strong>
                            </article>
                        </section>
                        <section className="card-footer">
                            <div className="card-social">
                                <div className="card-indicator" />
                                <strong>
                                    {user.location ?? "No location"}
                                </strong>
                            </div>
                            <div className="card-social">
                                <div className="card-indicator" />
                                <strong>
                                    {user.twitter_username ?? "Not Available"}
                                </strong>
                            </div>
                            <div className="card-social">
                                <div className="card-indicator" />
                                <strong>{user.html_url ?? "No website"}</strong>
                            </div>
                            <div className="card-social">
                                <div className="card-indicator" />
                                <strong>
                                    {user.company ?? "Not Available"}
                                </strong>
                            </div>
                        </section>
                    </div>
                </div>
            ) : null}
            {error ? <div>Error</div> : null}
        </div>
    );
};

export default App;
