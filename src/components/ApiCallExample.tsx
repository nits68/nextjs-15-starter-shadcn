"use client";

import { Badge } from "@/registry/new-york-v4/ui/badge";
import { Button } from "@/registry/new-york-v4/ui/button";
import useStore from "@/store/store";

export function ApiCallExample() {
    const s = useStore();

    return (
        <div id='counterExample' className='flex items-start gap-4'>
            <Button disabled={s.data} onClick={s.getUsers}>
                Execute API call - getUsers()
            </Button>
            <Button disabled={!s.data} onClick={s.clearUsers}>
                Clear users data
            </Button>
            <Badge className="bg-amber-700 -ml-8">{`Number of users: ${s.data ? s.data.length : 0}`}</Badge>
            <div>
                {s.unpressed ? (
                    <h3>Users: Click "Execute API call" button</h3>
                ) : s.loading ? (
                    <p>Loading...</p>
                ) : s.error ? (
                    <p>Error fetching data: {s.errorData}</p>
                ) : (
                    <div>
                        <h3>Users:</h3>
                        <ul>{s.data?.map(({ name, id }: { name: string; id: number }) => <li key={id}>{name}</li>)}</ul>
                    </div>
                )}
            </div>
            <div>{ JSON.stringify(s.data) }</div>
        </div>
    );
}
