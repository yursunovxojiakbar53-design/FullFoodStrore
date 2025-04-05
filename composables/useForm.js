import useVuelidate from '@vuelidate/core';
import { reactive } from 'vue';

export function useForm(initialValues, validations, vuelidateConfig = { $autoDirty: true }) {
	let values = reactive(initialValues);

	const initialValuesCopy = { ...initialValues };

	const $v = useVuelidate(validations, values, vuelidateConfig);

	const reset = () => {
		Object.keys(values).forEach((key) => {
			values[key] = initialValuesCopy[key];
		});
		$v.value.$reset();
	};

	return { values, $v, reset };
}
