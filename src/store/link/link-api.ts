import {Link} from ".";

export class LinkApi {
    private _retrieveLinks: () => Link[] = () => {
        return []
    }
    get retrieveLinks(): () => Link[] {
        return this._retrieveLinks;
    }

    set retrieveLinks(value: () => Link[]) {
        this._retrieveLinks = value;
    }

    private _registerLink: (link: Link) => void = (link: Link) => {
        console.warn("please implements setLink")
    }
    get registerLink(): (link: Link) => void {
        return this._registerLink;
    }

    set registerLink(value: (link: Link) => void) {
        this._registerLink = value;
    }

    private _registerLinks: (links: Link[]) => void = (links: Link[]) => {
        console.warn("please implements setLinks")
    }
    get registerLinks(): (links: Link[]) => void {
        return this._registerLinks;
    }

    set registerLinks(value: (links: Link[]) => void) {
        this._registerLinks = value;
    }
}
