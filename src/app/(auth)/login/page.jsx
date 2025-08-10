import { auth } from "@/auth";
import React from "react";
import Link from "next/link";
import Signout from "@/components/auth/signout-button";
import { SignIn } from "@/components/auth/sign-in";
import styles from "./login.module.css";

async function LoginPage() {
  const session = await auth();

  if (session) {
    const user = session.user;
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>
            Welcome, {user.details?.first_name || "User"}!
          </h1>
          <div className={styles.userInfo}>
            {user.details ? (
              <>
                <p>User Type: {user.details.user_type}</p>
                <p>User Role: {user.details.user_role}</p>
                <p>
                  Full Name: {user.details.first_name} {user.details.last_name}
                </p>
                <p>Email: {user.details.email}</p>
                <p>Phone: {user.details.phone_number}</p>
              </>
            ) : (
              <p>Loading user details...</p>
            )}
          </div>
          <Signout />
          <Link href="/dashboard" className={styles.link}>
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign In</h1>
        <SignIn />
      </div>
    </div>
  );
}

export default LoginPage;
