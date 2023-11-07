import profileReducer, {addPostActionCreator, deletePostAC, ProfileReducerState} from "./profile-reducer";

let state = new ProfileReducerState()

it('length of post should be incremented', () => {
    let action = addPostActionCreator('it-kamasutra.com')

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(3)
})


it('message of new post', () => {
    let action = addPostActionCreator('it-kamasutra.com')

    let newState = profileReducer(state, action)

    expect(newState.posts[2].message).toBe('it-kamasutra.com')
})

it('after deleting length', () => {
    let action = deletePostAC('1')

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(1)
})

it('after deleting length shouldnt be decrement if id is incorrect', () => {
    let action = deletePostAC('4')

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(2)
})

