"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@lib/auth";
import { Button } from "@ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@ui/card";
import { Input } from "@ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
	username: z.string().min(1, "Username is required"),
	password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
	const router = useRouter();
	const { login } = useAuth();
	const [error, setError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginForm>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginForm) => {
		setError(null);
		try {
			await login(data.username, data.password);
			router.push("/d");
		} catch {
			setError("Invalid username or password");
		}
	};

	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>You neet to Login</CardTitle>
				<CardDescription>
					I'm not sure you're the real owner of this site
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="space-y-2">
						<Input
							placeholder="Username"
							autoComplete="username"
							{...register("username")}
						/>
						{errors.username && (
							<p className="text-destructive text-sm">
								{errors.username.message}
							</p>
						)}
					</div>
					<div className="space-y-2">
						<Input
							type="password"
							placeholder="Password"
							autoComplete="current-password"
							{...register("password")}
						/>
						{errors.password && (
							<p className="text-destructive text-sm">
								{errors.password.message}
							</p>
						)}
					</div>
					{error && <p className="text-destructive text-sm">{error}</p>}
					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? "Signing in..." : "Sign in"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
