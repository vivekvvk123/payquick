import { Button } from "./button";

interface AppbarProps{
    user?: {
        name?: string | null
    }
    onSignin: any
    onSignout: any
}

export function Appbar({user, onSignin, onSignout}: AppbarProps) {
    return (
        <div className="flex container mx-auto sticky top-0 z-50">
            <div className="flex bg-zinc-800/60 backdrop-blur-lg p-2 mt-4 mb-4 justify-between border-b border-gray-700 container items-center content-center rounded-3xl">
                <div className="ml-3 text-lg">
                    PayQuick
                </div>
                <div className="text- mr-2">
                    <Button className="px-4 py-1" onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
                </div>
            </div>
        </div>
    )
}