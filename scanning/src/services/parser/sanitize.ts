const removeWeirdCharacters = (text: string) => text.replace(/[\*&:]/g, '');

export default (text: string) => removeWeirdCharacters(text);
