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
        <div className="flex bg-blue-600 p-2 justify-between border-b text-lg">
            <div>
                PayQuick
            </div>
            <div>
                <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
            </div>
        </div>
    )
}