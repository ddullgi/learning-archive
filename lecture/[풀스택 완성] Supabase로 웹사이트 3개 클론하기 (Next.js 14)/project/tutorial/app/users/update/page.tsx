"use client"

import { userState } from "@/app/recoil/atoms";
import Link from "next/link";
import { useRecoilState } from "recoil";

export default function UpdateUserPage() {
  const [user, setUser] = useRecoilState(userState);

  const handleUpdate = () => {
    // Update user logic
  }

  return (
    <div>
      <h1>Update User</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={user.email}
        onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
      />
      <input type="text" placeholder="name" value={user.name}
        onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
      />
      <button type="button" onClick={handleUpdate}>Update</button>

      <Link href="/users/updated-user">Check Updated User</Link>
    </div>
  );
}
