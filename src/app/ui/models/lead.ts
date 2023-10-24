export interface Lead {
    first_name: string;
    last_name: string;
    lead_id: string;
    email: string;
    source: string;
    home_phone: string;
    cell_phone: string;
    duplicate_of: string;
    potential_duplicates?:[]
}
