import { getAccessToken, getUserToken } from "@fern-api/auth";
import { AccessTokenPosthogManager } from "./AccessTokenPosthogManager";
import { NoopPosthogManager } from "./NoopPosthogManager";
import { PosthogManager } from "./PosthogManager";
import { UserPosthogManager } from "./UserPosthogManager";

let posthogManager: PosthogManager | undefined;

export async function getPosthogManager(): Promise<PosthogManager> {
    if (posthogManager == null) {
        posthogManager = await createPosthogManager();
    }
    return posthogManager;
}

async function createPosthogManager(): Promise<PosthogManager> {
    const posthogApiKey = process.env.POSTHOG_API_KEY;
    if (posthogApiKey == null) {
        return new NoopPosthogManager();
    }
    const userToken = await getUserToken();
    if (userToken != null) {
        return new UserPosthogManager({ token: userToken, posthogApiKey });
    }
    const accessToken = await getAccessToken();
    if (accessToken != null) {
        return new AccessTokenPosthogManager({ posthogApiKey });
    }
    return new UserPosthogManager({ token: undefined, posthogApiKey });
}
