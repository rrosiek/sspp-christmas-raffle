<script lang="ts">
  import { type InferType, ValidationError } from "yup";
  import type { TypedSchema } from "yup/lib/util/types";

  type AnyObject = Record<string, unknown>;

  export let asyncSubmit: Function;
  export let validate: (formData: AnyObject) => Promise<InferType<TypedSchema>>;

  let errors: Record<string, string> = {};
  let loading = false;

  const handleSubmit = async (event: SubmitEvent) => {
    const formEl = event.currentTarget as HTMLFormElement;

    errors = {};
    loading = true;

    const formData = buildFormData(formEl.elements);

    try {
      const schema: InferType<TypedSchema> = await validate(formData);
      console.table(schema);
      await asyncSubmit(schema);
    } catch (err) {
      console.log(err);
      if (err instanceof ValidationError) {
        errors = err.inner.reduce(
          (errors, e) => ({ ...errors, [e.path as string]: e.message }),
          {}
        );
      }
    } finally {
      loading = false;
    }
  };

  const buildFormData = (elements: HTMLFormControlsCollection) => {
    const data: AnyObject = {};

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i] as HTMLInputElement;
      if (el.type === "file") {
        data[el.name] = el.files;
      } else {
        data[el.name] = el.value;
      }
    }

    return data;
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <slot {errors} {loading} />
</form>
