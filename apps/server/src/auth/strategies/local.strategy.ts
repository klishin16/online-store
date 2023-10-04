import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {UsersService} from "../../users/users.service";
import {AuthService} from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email'
        });
    }

    async validate(email: string, password: string) {
        try {
            return this.authService.validateUser(email, password)
        } catch (err) {
            throw new UnauthorizedException(err);
        }
    }
}