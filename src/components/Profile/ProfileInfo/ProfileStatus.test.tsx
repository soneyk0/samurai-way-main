import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";
import {updateStatusTC} from "../../../redux/profile-reducer";

describe("ProfileStatus component", () => {
    test("after creation <span>", () => {
        const component = create(<ProfileStatus status={'hello'} updateStatus={updateStatusTC}/>);
        const root = component.root;
        let span = root.findByType('span')
        expect(span.children.length).toBe(1);
    });

    test("after creation <span> status should be 'hello'", () => {
        const component = create(<ProfileStatus status={'hello'} updateStatus={updateStatusTC}/>);
        const root = component.root;
        let span = root.findByType('span')
        expect(span.children[0]).toBe('hello');
    });
});