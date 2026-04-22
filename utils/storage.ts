
import { findFile, createFile, getFileContent, updateFile } from './googleDrive';

export interface UserProfile {
    name: string;
    phone: string;
    age: string;
    gender: string;
    city: string;
    pincode: string;
    joinDate: string;
    password?: string;
    email?: string;
    photoURL?: string;
}

export interface AgentProfile {
    id: string;
    joinDate: string;
    status: string;
    name: string;
    phone: string;
    age: string;
    gender: string;
    city: string;
    aadhar: string;
    photo: string;
    vehicleType: string;
    licenseNumber: string;
    vehiclePhoto: string;
    accountNumber: string;
    bankName: string;
    branch: string;
    ifsc: string;
    password?: string;
    email?: string;
    photoURL?: string;
}


export interface StoredPickup {
    id: string;
    medicineName: string;
    pickupDate: string;
    timeSlot: string;
    status: string;
    riskLevel: string;
    timestamp: string;
}


const USER_PROFILE_FILE = 'planet_prescription_user_profile.json';
const AGENT_PROFILE_FILE = 'planet_prescription_agent_profile.json';


// Generic Helpers for localStorage
const getStorageItem = <T,>(key: string, defaultValue: T): T => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.error(`Error reading ${key}`, e);
        return defaultValue;
    }
};

const setStorageItem = <T,>(key: string, value: T): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error(`Error writing ${key}`, e);
    }
};

// --- User Profile --- 

export const saveUserProfile = async (profile: UserProfile): Promise<void> => {
    // Save to local storage for offline access and immediate availability
    setStorageItem('userProfile', profile);

    try {
        const fileId = await findFile(USER_PROFILE_FILE);
        if (fileId) {
            await updateFile(fileId, profile);
        } else {
            await createFile(USER_PROFILE_FILE, profile);
        }
    } catch (error) {
        console.error("Failed to save user profile to Google Drive:", error);
        // The data is still in localStorage
    }
};

export const getUserProfile = async (): Promise<UserProfile | null> => {
    try {
        const fileId = await findFile(USER_PROFILE_FILE);
        if (fileId) {
            const profile = await getFileContent(fileId);
            if (profile) {
                // Cache in local storage for next time
                setStorageItem('userProfile', profile);
                return profile;
            }
        }
    } catch (error) {
        console.error("Failed to get user profile from Google Drive:", error);
    }

    // Fallback to local storage if Drive fails or file doesn't exist
    return getStorageItem<UserProfile | null>('userProfile', null);
};


// --- Agent Profile ---

export const saveAgentProfile = async (profile: AgentProfile): Promise<void> => {
    setStorageItem('agentProfile', profile);

    try {
        const fileId = await findFile(AGENT_PROFILE_FILE);
        if (fileId) {
            await updateFile(fileId, profile);
        } else {
            await createFile(AGENT_PROFILE_FILE, profile);
        }
    } catch (error) {
        console.error("Failed to save agent profile to Google Drive:", error);
    }
};

export const getAgentProfile = async (): Promise<AgentProfile | null> => {
    try {
        const fileId = await findFile(AGENT_PROFILE_FILE);
        if (fileId) {
            const profile = await getFileContent(fileId);
            if (profile) {
                setStorageItem('agentProfile', profile);
                return profile;
            }
        }
    } catch (error) {
        console.error("Failed to get agent profile from Google Drive:", error);
    }
    return getStorageItem<AgentProfile | null>('agentProfile', null);
};



// Pickups
export const getUserPickups = () => getStorageItem<StoredPickup[]>('userPickups', []);
export const saveUserPickup = (pickup: StoredPickup) => {
    const pickups = getUserPickups();
    const updatedPickups = [pickup, ...pickups];
    setStorageItem('userPickups', updatedPickups);
    incrementLifetimeUsage();
    return updatedPickups;
};

// Usage Stats
export const getLifetimeUsage = () => {
    const val = localStorage.getItem('lifetimeUsage');
    return val ? parseInt(val, 10) : 0;
};

export const incrementLifetimeUsage = () => {
    const current = getLifetimeUsage();
    localStorage.setItem('lifetimeUsage', (current + 1).toString());
};
