import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand';
import { devtools } from 'zustand/middleware';
// import jwtDecode from 'jwt-decode';

type AuthStore = {
	accessToken: string | undefined;
	refreshToken: string | undefined;
}

const authStore = createStore<AuthStore>()(
	devtools(
		(set, get) => ({
			accessToken: undefined,
			refreshToken: undefined,
		}),
		{
			name: 'auth-store',
			// enabled: !import.meta.env.PROD,
		}
	)
);