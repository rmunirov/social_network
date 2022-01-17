import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe('ProfileStatus component', () => {
    test('it shows the expected text is equal a passed status text', () => {
        const component = create(<ProfileStatus status={'Status text'} />);
        const instance = component.root;
        const profileStatus = instance.findByType(ProfileStatus);
        expect(profileStatus.props.status).toBe('Status text');
    });
});
