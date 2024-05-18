export function validateEmail(email: string): string[] {
    const errors = [];

    // Check if email is not empty
    if (!email.trim()) {
        errors.push("Email must not be empty.");
    }

    // Check if email is a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push("Invalid email address.");
    }

    return errors;
}

export function validateUsername(username: string): string[] {
    const errors = [];

    // Check if username is a string
    if (typeof username !== "string") {
        errors.push("Username must be a string.");
    }

    // Check if username contains only alphanumeric characters
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        errors.push("Username must contain only alphanumeric characters.");
    }

    // Check if username length exceeds 20 characters
    if (username.length > 20) {
        errors.push("Username cannot exceed 20 characters.");
    }

    // Check if username is not empty
    if (!username.trim()) {
        errors.push("Username must not be empty.");
    }

    return errors;
}

export function isStrongPassword(password: string) {
    // Password must contain at least one upper case, one lower case, one number, one special character
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

export function validatePassword(password: string): string[] {
    if (!password) {
        return ["Password must not be empty."];
    }
    if (password.length < 8) {
        return ["Password must be at least 8 characters long."];
    }
    if (!isStrongPassword(password)) {
        return [
            "Password must contain at least one upper case, one lower case, one number, one special character.",
        ];
    }
    return []; // No validation errors
}

export function validateTitle(title: string): string[] {
    if (!title) return ["Title cannot be empty."];
    if (title.length > 20) return ["Title must be at max 20 characters."];
    if (title.length < 5) return ["Title must be at least 5 characters."];
    return [];
}
export function validateDescription(description: string): string[] {
    if (!description) return ["description cannot be empty."];
    if (description.length > 1000)
        return ["description must be at max 1000 characters."];
    if (description.length < 5)
        return ["description must be at least 5 characters."];
    return [];
}
